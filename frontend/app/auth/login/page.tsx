'use client';

import Link from 'next/link';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { login as apiLogin } from '@/api/auth';
import { API_URL } from '@/api/client';

function LoginForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { login } = useAuth();

    // Check for error param or verify email message
    const errorParam = searchParams.get('error');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formError, setFormError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleGoogleLogin = () => {
        window.location.href = `${API_URL}/auth/google`;
    };

    const handleFacebookLogin = () => {
        window.location.href = `${API_URL}/auth/facebook`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError('');
        setLoading(true);

        try {
            const data = await apiLogin({ email, password });
            // Expecting { accessToken: string, user: User }
            login(data.accessToken, data.user);
        } catch (err: any) {
            setFormError(err.message);
        } finally {
            setLoading(false);
        }
    };

    let displayError = formError;
    if (!displayError && errorParam) {
        if (errorParam === 'auth_failed') displayError = 'Authentication failed. Please try again.';
        else if (errorParam === 'verify_email') displayError = 'Signup successful! Please check your email to verify your account (check console if using dummy email service).';
        else if (errorParam === 'no_token') displayError = 'Login failed. No token received.';
        else displayError = 'An error occurred.';
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
                <h1 className="text-3xl font-bold text-center text-zinc-900 dark:text-white mb-2">Welcome Back</h1>
                <p className="text-center text-zinc-500 mb-8">Sign in to your account</p>

                {displayError && (
                    <div className={`p-3 rounded-lg text-sm text-center mb-6 ${errorParam === 'verify_email' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                        {displayError}
                    </div>
                )}

                <form className="space-y-4 mb-6" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {loading ? 'Signing In...' : 'Sign In with Email'}
                    </button>
                </form>

                <div className="relative mb-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-zinc-200 dark:border-zinc-700"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white dark:bg-zinc-900 text-zinc-500">Or continue with</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium"
                    >
                        Google
                    </button>
                    <button
                        onClick={handleFacebookLogin}
                        className="flex items-center justify-center gap-2 px-4 py-2 border border-zinc-200 dark:border-zinc-700 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 font-medium"
                    >
                        Facebook
                    </button>
                </div>

                <p className="mt-8 text-center text-sm text-zinc-600 dark:text-zinc-400">
                    Don't have an account?{' '}
                    <Link href="/auth/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
        </Suspense>
    )
}

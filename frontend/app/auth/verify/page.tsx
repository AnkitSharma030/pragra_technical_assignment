'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyEmail } from '@/api/auth';
import Link from 'next/link';

function VerifyContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('No verification token found.');
            return;
        }

        const verify = async () => {
            try {
                await verifyEmail(token);
                setStatus('success');
                setMessage('Email verified successfully! You can now login.');
                // Optional: Redirect after a few seconds
                setTimeout(() => {
                    router.push('/auth/login');
                }, 3000);
            } catch (error: any) {
                console.error('Verification failed', error);
                setStatus('error');
                setMessage(error.message || 'Verification failed. The token may be invalid or expired.');
            }
        };

        verify();
    }, [token, router]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-center">
                {status === 'verifying' && (
                    <>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">Verifying Email</h2>
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
                    </>
                )}

                {status === 'success' && (
                    <>
                        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Email Verified</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">{message}</p>
                        <Link
                            href="/auth/login"
                            className="inline-block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl transition-colors"
                        >
                            Proceed to Login
                        </Link>
                    </>
                )}

                {status === 'error' && (
                    <>
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Verification Failed</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 mb-6">{message}</p>
                        <Link
                            href="/auth/login"
                            className="inline-block w-full bg-zinc-200 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-medium py-3 rounded-xl transition-colors"
                        >
                            Back to Login
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default function VerifyPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <VerifyContent />
        </Suspense>
    );
}

'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// import { useAuth } from '../../context/AuthContext';
import { useAuth } from '@/context/AuthContext';

function AuthSuccessContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login } = useAuth();


    useEffect(() => {
        const token = searchParams.get('token');
        const userStr = searchParams.get('user');

        if (token && userStr) {
            try {
                const user = JSON.parse(decodeURIComponent(userStr));
                login(token, user);
                // Redirect will happen in login, but we can double check or show a message
            } catch (error) {
                console.error('Failed to parse user data', error);
                router.push('/auth/login?error=auth_failed');
            }
        } else {
            router.push('/auth/login?error=no_token');
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">Authenticating...</h2>
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
            </div>
        </div>
    );
}

export default function AuthSuccessPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <AuthSuccessContent />
        </Suspense>
    );
}

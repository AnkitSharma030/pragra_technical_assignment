'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from './AuthContext';

export default function AuthHandler() {
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
            } catch (e) {
                console.error('Failed to parse user from query', e);
            }
        }
    }, [searchParams, login]);

    return null; // This component renders nothing
}

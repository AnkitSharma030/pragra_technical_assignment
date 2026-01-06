'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="flex justify-center mb-6">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Order Successful!</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                    Thank you for your purchase. We've received your order and are processing it now.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="/orders"
                        className="block w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        View My Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}

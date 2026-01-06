'use client';

import React from 'react';
import Link from 'next/link';
import { XCircle } from 'lucide-react';

export default function CancelPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800 text-center">
                <div className="flex justify-center mb-6">
                    <XCircle className="w-16 h-16 text-red-500" />
                </div>
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-2">Payment Cancelled</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">
                    Your payment was not completed. No charges were made to your account.
                </p>
                <div className="space-y-4">
                    <Link
                        href="/checkout"
                        className="block w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Try Again
                    </Link>
                    <Link
                        href="/cart"
                        className="block w-full bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white font-bold py-3 px-4 rounded-lg transition-colors"
                    >
                        Back to Cart
                    </Link>
                </div>
            </div>
        </div>
    );
}

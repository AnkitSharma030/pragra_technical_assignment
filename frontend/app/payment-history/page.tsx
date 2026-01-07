'use client';

import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getPaymentHistory, PaymentRecord } from '@/api/payment';
import Link from 'next/link';

export default function PaymentHistoryPage() {
    const { user, token } = useAuth();
    const [payments, setPayments] = useState<PaymentRecord[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user && user._id) {
            getPaymentHistory(user._id)
                .then((data) => {
                    setPayments(data);
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Failed to fetch payments", err);
                    setLoading(false);
                });
        } else if (!token) {
            setLoading(false);
        }
    }, [user, token]);

    if (!user) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4 text-zinc-900 dark:text-white">Please Login to view payment history</h2>
                    <Link href="/auth/login" className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Login</Link>
                </div>
            </div>
        );
    }

    if (loading) {
        return <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center text-zinc-600 dark:text-zinc-400">Loading history...</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Payment History</h1>

                {payments.length === 0 ? (
                    <div className="bg-white dark:bg-zinc-900 p-8 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 text-center">
                        <p className="text-zinc-500 dark:text-zinc-400 mb-4">No payment history found.</p>
                        <Link href="/" className="text-indigo-600 hover:text-indigo-500 font-medium">Start Shopping</Link>
                    </div>
                ) : (
                    <div className="bg-white dark:bg-zinc-900 overflow-hidden shadow-sm rounded-2xl border border-zinc-200 dark:border-zinc-800">
                        <ul className="divide-y divide-zinc-200 dark:divide-zinc-800">
                            {payments.map((payment) => (
                                <li key={payment._id} className="p-6 hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-1">
                                                ID: {payment.stripePaymentId}
                                            </p>
                                            <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                {new Date(payment.createdAt).toLocaleDateString()} at {new Date(payment.createdAt).toLocaleTimeString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-zinc-900 dark:text-white">
                                                ${(payment.amount / 100).toFixed(2)}
                                            </p>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 capitalize mt-1">
                                                {payment.status}
                                            </span>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}

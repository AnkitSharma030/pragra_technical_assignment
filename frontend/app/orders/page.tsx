'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getMyOrders, Order } from '@/api/orders';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function MyOrdersPage() {
    const { user, token } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        if (!token) {
            router.push('/auth/login');
            return;
        }

        const fetchOrders = async () => {
            if (user?._id) {
                try {
                    const data = await getMyOrders(user._id);
                    setOrders(data);
                } catch (error) {
                    console.error('Failed to fetch orders', error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchOrders();
    }, [user, token, router]);

    if (loading) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">My Orders</h1>

                {orders.length === 0 ? (
                    <div className="text-center py-12 bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                        <p className="text-zinc-500 dark:text-zinc-400 mb-4">You haven't placed any orders yet.</p>
                        <Link
                            href="/"
                            className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {orders.map((order) => (
                            <div
                                key={order._id}
                                className="bg-white dark:bg-zinc-900 rounded-2xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden"
                            >
                                <div className="p-6 border-b border-zinc-200 dark:border-zinc-800 flex flex-wrap gap-4 justify-between items-center bg-zinc-50/50 dark:bg-zinc-900/50">
                                    <div>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Order Placed</p>
                                        <p className="font-medium text-zinc-900 dark:text-white">
                                            {new Date(order.createdAt).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Amount</p>
                                        <p className="font-medium text-zinc-900 dark:text-white">
                                            ${order.totalAmount.toFixed(2)}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">Order #</p>
                                        <p className="font-mono text-zinc-900 dark:text-white text-sm">
                                            {order._id}
                                        </p>
                                    </div>
                                    <div>
                                        <span
                                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize
                                                ${order.status === 'paid'
                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                    : order.status === 'shipped'
                                                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                                        : order.status === 'cancelled'
                                                            ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                                }`}
                                        >
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="space-y-4">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex gap-4 items-center">
                                                <div className="relative h-20 w-20 flex-shrink-0 rounded-lg overflow-hidden bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700">
                                                    {item.imageUrl ? (
                                                        <img
                                                            src={item.imageUrl}
                                                            alt={item.title}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-400">
                                                            <span className="text-xs">No Image</span>
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex-grow">
                                                    <h3 className="font-medium text-zinc-900 dark:text-white">
                                                        {item.title}
                                                    </h3>
                                                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                                        Qty: {item.quantity}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-zinc-900 dark:text-white">
                                                        ${item.price.toFixed(2)}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5">
                                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-white mb-3">
                                            Shipping Address
                                        </h4>

                                        <div className="space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                                            <p className="font-medium text-zinc-900 dark:text-white">
                                                {order.shippingAddress.fullName}
                                            </p>

                                            <p>{order.shippingAddress.phone}</p>

                                            <p>
                                                {order.shippingAddress.addressLine1}
                                                {order.shippingAddress.addressLine2 && (
                                                    <>, {order.shippingAddress.addressLine2}</>
                                                )}
                                            </p>

                                            <p>
                                                {order.shippingAddress.city}, {order.shippingAddress.state}
                                            </p>

                                            <p>
                                                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

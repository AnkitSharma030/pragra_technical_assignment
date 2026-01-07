'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isUser, setIsUser] = useState(null);
    const { cartCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    console.log(user);

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500">
                        Future Store
                    </Link>

                    {user &&
                        <div className="hidden md:flex items-center space-x-8">
                            <Link
                                href="/products"
                                className={`text-sm font-medium transition-colors ${isActive('/products') ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                            >
                                Products
                            </Link>
                            <Link
                                href="/cart"
                                className={`text-sm font-medium transition-colors relative ${isActive('/cart') ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                            >
                                Cart
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-4 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                            <Link
                                href="/orders"
                                className={`text-sm font-medium transition-colors ${isActive('/orders') ? 'text-indigo-600 dark:text-indigo-400' : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'}`}
                            >
                                Orders
                            </Link>
                        </div>
                    }

                    <div className="flex items-center gap-4">
                        {isAuthenticated ? (
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-zinc-600 dark:text-zinc-300 hidden sm:block">
                                    Hi, {user?.name || 'User'}
                                </span>
                                <button
                                    onClick={logout}
                                    className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors"
                                >
                                    Logout
                                </button>
                                {/* Optional: Add Order History Link */}
                                {/* <Link href="/orders" ...>Orders</Link> */}
                            </div>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

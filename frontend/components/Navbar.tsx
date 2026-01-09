'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const { cartCount } = useCart();
    const { user, logout, isAuthenticated } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-purple-500"
                    >
                        Future Store
                    </Link>

                    {/* Desktop Links */}
                    {user && (
                        <div className="hidden md:flex items-center space-x-6">
                            <Link
                                href="/products"
                                className={`text-sm font-medium transition-colors ${isActive('/products')
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                            >
                                Products
                            </Link>

                            <Link
                                href="/cart"
                                className={`text-sm font-medium transition-colors relative ${isActive('/cart')
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
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
                                className={`text-sm font-medium transition-colors ${isActive('/orders')
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                            >
                                Orders
                            </Link>

                            <Link
                                href="/payment-history"
                                className={`text-sm font-medium transition-colors ${isActive('/payment-history')
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                                    }`}
                            >
                                Payments
                            </Link>
                        </div>
                    )}

                    {/* Desktop Auth */}
                    <div className="hidden md:flex items-center gap-4">
                        {isAuthenticated ? (
                            <>
                                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                                    Hi, {user?.name || 'User'}
                                </span>
                                <button
                                    onClick={logout}
                                    className="text-sm font-medium text-red-500 hover:text-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                href="/auth/login"
                                className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>

                    {/* Mobile Burger */}
                    <button
                        className="md:hidden text-2xl text-zinc-700 dark:text-zinc-200"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        {menuOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800 px-4 py-4 space-y-4">
                    {user && (
                        <>
                            <Link href="/products" onClick={() => setMenuOpen(false)} className="block text-sm font-medium">
                                Products
                            </Link>
                            <Link href="/cart" onClick={() => setMenuOpen(false)} className="block text-sm font-medium">
                                Cart ({cartCount})
                            </Link>
                            <Link href="/orders" onClick={() => setMenuOpen(false)} className="block text-sm font-medium">
                                Orders
                            </Link>
                            <Link
                                href="/payment-history"
                                onClick={() => setMenuOpen(false)}
                                className="block text-sm font-medium"
                            >
                                Payments
                            </Link>
                        </>
                    )}

                    <div className="border-t pt-4">
                        {isAuthenticated ? (
                            <button
                                onClick={() => {
                                    logout();
                                    setMenuOpen(false);
                                }}
                                className="text-sm font-medium text-red-500"
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                href="/auth/login"
                                onClick={() => setMenuOpen(false)}
                                className="block bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium text-center"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

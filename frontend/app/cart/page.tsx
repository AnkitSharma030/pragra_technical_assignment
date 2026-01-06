'use client';

import Link from 'next/link';
import { useCart } from '../../context/CartContext';

export default function CartPage() {
    const { cart, removeFromCart, cartTotal, clearCart } = useCart();

    if (cart.length === 0) {
        return (
            <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center p-4">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Your Cart is Empty</h1>
                <p className="text-zinc-600 dark:text-zinc-400 mb-8">Looks like you haven't added anything yet.</p>
                <Link href="/products" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full font-medium transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-8">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-zinc-900 dark:text-white mb-8">Shopping Cart</h1>

                <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800 overflow-hidden">
                    {cart.map((item: any) => (
                        <div key={item._id} className="flex items-center p-6 border-b border-zinc-200 dark:border-zinc-800 last:border-0 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors">
                            <img src={item.imageUrl} alt={item.title} className="w-24 h-24 object-cover rounded-lg bg-zinc-100" />
                            <div className="ml-6 flex-grow">
                                <h3 className="text-lg font-semibold text-zinc-900 dark:text-white">{item.title}</h3>
                                <p className="text-zinc-500 text-sm mt-1">Quantity: {item.quantity}</p>
                                <button
                                    onClick={() => removeFromCart(item._id)}
                                    className="text-red-500 text-sm mt-2 hover:text-red-600 font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-zinc-900 dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                                {item.quantity > 1 && (
                                    <p className="text-zinc-400 text-sm">${item.price.toFixed(2)} each</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-zinc-900 p-6 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
                    <button
                        onClick={clearCart}
                        className="text-zinc-500 hover:text-red-500 font-medium transition-colors mb-4 sm:mb-0"
                    >
                        Clear Cart
                    </button>

                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="text-zinc-600 dark:text-zinc-400">Total</span>
                            <span className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">${cartTotal.toFixed(2)}</span>
                        </div>
                        <Link
                            href="/checkout"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-indigo-500/20 transition-all hover:scale-105"
                        >
                            Proceed to Checkout
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

'use client';
import Link from 'next/link';
import { useCart } from '../context/CartContext';

interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart } = useCart();
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-zinc-200 dark:border-zinc-800 flex flex-col h-full">
            <div className="relative h-48 w-full overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2 flex-grow">{product.description}</p>
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">${product.price.toFixed(2)}</span>
                    <button
                        onClick={() => addToCart(product)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}

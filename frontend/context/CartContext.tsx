'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import * as cartApi from '@/api/cart';

export interface CartItem {
    _id: string;
    title: string;
    price: number;
    imageUrl: string;
    quantity: number;
    description?: string;
    category?: string;
}

interface CartContextType {
    cart: CartItem[];
    addToCart: (product: any) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(false);
    const { user, token } = useAuth();

    // Load cart based on authentication status
    useEffect(() => {
        const loadCart = async () => {
            if (token && user) {
                // Load from backend for authenticated users
                try {
                    setLoading(true);
                    const response = await cartApi.getCart();
                    // Map backend 'productId' to frontend '_id'
                    const mappedItems = (response.items || []).map((item: any) => ({
                        ...item,
                        _id: item.productId,
                    }));
                    setCart(mappedItems);
                } catch (error) {
                    console.error('Failed to load cart from backend', error);
                    // Fallback to local storage
                    const savedCart = localStorage.getItem(`cart_${user._id}`);
                    if (savedCart) {
                        setCart(JSON.parse(savedCart));
                    }
                } finally {
                    setLoading(false);
                }
            } else {
                // Load from local storage for guests
                const savedCart = localStorage.getItem('cart_guest');
                if (savedCart) {
                    try {
                        setCart(JSON.parse(savedCart));
                    } catch (e) {
                        console.error('Failed to parse cart', e);
                    }
                }
            }
        };

        loadCart();
    }, [user, token]);

    // Save cart to appropriate storage
    useEffect(() => {
        if (user) {
            localStorage.setItem(`cart_${user._id}`, JSON.stringify(cart));
        } else {
            localStorage.setItem('cart_guest', JSON.stringify(cart));
        }
    }, [cart, user]);

    const addToCart = async (product: any) => {
        if (token && user) {
            // Add to backend for authenticated users
            try {
                const response = await cartApi.addToCart({
                    productId: product._id,
                    title: product.name,
                    price: product.price,
                    imageUrl: product.image,
                    description: product.description,
                    category: product.category,
                });
                // Map backend 'productId' to frontend '_id'
                const mappedItems = (response.items || []).map((item: any) => ({
                    ...item,
                    _id: item.productId,
                }));
                setCart(mappedItems);
            } catch (error) {
                console.error('Failed to add to cart', error);
            }
        } else {
            // Add to local storage for guests
            setCart((prevCart) => {
                const existingItem = prevCart.find((item) => item._id === product._id);
                if (existingItem) {
                    return prevCart.map((item) =>
                        item._id === product._id
                            ? { ...item, quantity: item.quantity + 1 }
                            : item
                    );
                }
                return [...prevCart, { ...product, quantity: 1 }];
            });
        }
    };

    const removeFromCart = async (productId: string) => {
        if (token && user) {
            // Remove from backend for authenticated users
            try {
                const response = await cartApi.removeFromCart(productId);
                setCart(response.items || []);
            } catch (error) {
                console.error('Failed to remove from cart', error);
            }
        } else {
            // Remove from local storage for guests
            setCart((prevCart) => prevCart.filter((item) => item._id !== productId));
        }
    };

    const clearCart = async () => {
        if (token && user) {
            // Clear backend cart for authenticated users
            try {
                await cartApi.clearCart();
                setCart([]);
            } catch (error) {
                console.error('Failed to clear cart', error);
            }
        } else {
            // Clear local storage for guests
            setCart([]);
        }
    };

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, cartTotal, cartCount, loading }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

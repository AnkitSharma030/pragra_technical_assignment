import { apiClient } from './client';

export const getCart = async () => {
    return apiClient('/cart');
};

export const addToCart = async (product: {
    productId: string;
    name: string;
    price: number;
    image: string;
    description?: string;
    category?: string;
}) => {
    return apiClient('/cart/add', {
        method: 'POST',
        body: JSON.stringify(product),
    });
};

export const removeFromCart = async (productId: string) => {
    return apiClient(`/cart/remove/${productId}`, {
        method: 'DELETE',
    });
};

export const updateCartQuantity = async (productId: string, quantity: number) => {
    return apiClient('/cart/update', {
        method: 'PUT',
        body: JSON.stringify({ productId, quantity }),
    });
};

export const clearCart = async () => {
    return apiClient('/cart/clear', {
        method: 'DELETE',
    });
};

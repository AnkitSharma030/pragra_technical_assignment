import { apiClient } from './client';

export interface Product {
    // Define interface if known, or use any/unknown
    _id?: string;
    name: string;
    description: string;
    price: number;
    image: string;
    stock: number;
}

export const fetchProducts = async () => {
    try {
        return await apiClient<Product[]>('/products', { cache: 'no-store' });
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const seedProducts = async () => {
    return apiClient('/products/seed', {
        method: 'POST',
    });
};

import { API_URL } from '@/api/client';

export const fetchProducts = async () => {
    try {
        const res = await fetch(`${API_URL}/products`, { cache: 'no-store' });
        if (!res.ok) {
            console.error(`Fetch failed: ${res.status} ${res.statusText}`);
            throw new Error('Failed to fetch products');
        }
        return res.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
};

export const seedProducts = async () => {
    const res = await fetch(`${API_URL}/products/seed`, {
        method: 'POST',
    });
    return res.json();
};

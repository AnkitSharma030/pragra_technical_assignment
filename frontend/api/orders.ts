import { apiClient } from './client';

export interface OrderItem {
    productId: string;
    title: string;
    quantity: number;
    price: number;
    imageUrl?: string;
    description?: string;
}

export interface ShippingAddress {
    fullName: string;
    phone: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    status: 'pending' | 'paid' | 'shipped' | 'cancelled';
    shippingAddress: ShippingAddress;
    createdAt: string;
    updatedAt: string;
}

export const getMyOrders = async (userId: string): Promise<Order[]> => {
    return apiClient(`/orders/my-orders/${userId}`);
};

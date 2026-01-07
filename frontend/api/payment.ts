import { apiClient } from './client';

export interface PaymentRecord {
    _id: string;
    userId: string;
    stripePaymentId: string;
    amount: number;
    status: string;
    createdAt: string;
}

export const savePayment = async (data: { userId: string; stripePaymentId: string; amount: number; status?: string }) => {
    return apiClient('/payments/save', {
        method: 'POST',
        body: JSON.stringify(data),
    });
};

export const getPaymentHistory = async (userId: string) => {
    return apiClient<PaymentRecord[]>(`/payments/history/${userId}`);
};

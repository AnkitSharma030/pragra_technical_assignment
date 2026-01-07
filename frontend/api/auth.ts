import { apiClient } from './client';

export const signup = async (userData: { name: string; email: string; password: string }) => {
    return apiClient('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

export const login = async (credentials: { email: string; password: string }) => {
    return apiClient<{ accessToken: string; user: any }>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
};

export const verifyEmail = async (token: string) => {
    return apiClient(`/auth/verify?token=${token}`);
};

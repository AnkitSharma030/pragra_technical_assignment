export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export const apiClient = async <T = any>(endpoint: string, options: RequestInit = {}): Promise<T> => {
    const res = await fetch(`${API_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
    });

    if (!res.ok) {
        let errorMessage = 'An error occurred';
        try {
            const data = await res.json();
            errorMessage = data.message || errorMessage;
        } catch (e) {
            // If response is not JSON
            errorMessage = res.statusText;
        }
        throw new Error(errorMessage);
    }

    // Check if response is empty (e.g. 204)
    if (res.status === 204) return {} as T;

    return res.json();
};

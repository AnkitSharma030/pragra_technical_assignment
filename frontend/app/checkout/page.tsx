'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/api/client';

// Replace with your actual publishable key
const stripePromise = loadStripe('pk_test_51P...'); // TODO: Add real test key or env var

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cartTotal, clearCart, cart } = useCart();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Create PaymentIntent as soon as the page loads
        // Create PaymentIntent as soon as the page loads
        fetch(`${API_URL}/payments/create-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: Math.round(cartTotal * 100) }), // Amount in cents
        })
            .then((res) => res.json())
            .then((data) => setClientSecret(data.client_secret));
    }, [cartTotal]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) return;

        setProcessing(true);

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)!,
            },
        });

        if (result.error) {
            setError(result.error.message || 'Payment failed');
            setProcessing(false);
        } else {
            if (result.paymentIntent.status === 'succeeded') {
                // Create order in backend
                // Create order in backend
                await fetch(`${API_URL}/orders`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        userId: 'guest-user', // Replace with real auth user ID
                        items: cart.map(item => ({
                            productId: item._id,
                            title: item.title,
                            quantity: item.quantity,
                            price: item.price
                        })),
                        totalAmount: cartTotal,
                        status: 'paid',
                        stripePaymentId: result.paymentIntent.id
                    })
                });

                clearCart();
                router.push('/success'); // Create a success page
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-4 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }} />
            </div>
            {error && <div className="text-red-500 text-sm">{error}</div>}
            <button
                type="submit"
                disabled={!stripe || processing || !clientSecret}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors disabled:opacity-50"
            >
                {processing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
            </button>
        </form>
    );
};

export default function CheckoutPage() {
    const { cart } = useCart();

    if (cart.length === 0) {
        return <div className="p-8 text-center text-zinc-500">Cart is empty cannot proceed to checkout.</div>
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-md p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Secure Checkout</h1>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
}

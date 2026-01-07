'use client';

import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { API_URL } from '@/api/client';
import { savePayment } from '@/api/payment';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_51P...');

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cartTotal, clearCart, cart } = useCart();
    const { user } = useAuth();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const router = useRouter();
    const [clientSecret, setClientSecret] = useState('');

    // Address fields
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [addressLine1, setAddressLine1] = useState('');
    const [addressLine2, setAddressLine2] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    const [showAddressForm, setShowAddressForm] = useState(true);

    useEffect(() => {
        if (cartTotal > 0) {
            fetch(`${API_URL}/payments/create-intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: Math.round(cartTotal * 100) }),
            })
                .then((res) => res.json())
                .then((data) => setClientSecret(data.client_secret));
        }
    }, [cartTotal]);

    const handleAddressSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!fullName || !phone || !addressLine1 || !city || !state || !postalCode) {
            setError('Please fill in all required address fields');
            return;
        }
        setShowAddressForm(false);
        setError(null);
    };

    const handlePayment = async (event: React.FormEvent) => {
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
                // Save payment to DB
                try {
                    await savePayment({
                        userId: user?._id || 'guest-user',
                        stripePaymentId: result.paymentIntent.id,
                        amount: Math.round(cartTotal * 100), // Amount in cents
                        status: 'succeeded'
                    });
                } catch (err) {
                    console.error("Failed to save payment record", err);
                }

                // Create order with shipping address
                await fetch(`${API_URL}/orders`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                    },
                    body: JSON.stringify({
                        userId: user?._id || 'guest-user',
                        items: cart.map(item => ({
                            productId: item._id,
                            title: item.title || " ",
                            quantity: item.quantity,
                            price: item.price,
                            imageUrl: item.imageUrl || " ",
                            description: item.description,
                        })),
                        totalAmount: cartTotal,
                        status: 'paid',
                        stripePaymentId: result.paymentIntent.id,
                        shippingAddress: {
                            fullName,
                            phone,
                            addressLine1,
                            addressLine2,
                            city,
                            state,
                            postalCode,
                            country,
                        },
                    })
                });

                clearCart();
                router.push('/success');
            }
        }
    };

    if (showAddressForm) {
        return (
            <form onSubmit={handleAddressSubmit} className="space-y-4">
                <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">Shipping Address</h2>

                {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Full Name *</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Phone *</label>
                        <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                            required
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Address Line 1 *</label>
                    <input
                        type="text"
                        value={addressLine1}
                        onChange={(e) => setAddressLine1(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Address Line 2</label>
                    <input
                        type="text"
                        value={addressLine2}
                        onChange={(e) => setAddressLine2(e.target.value)}
                        className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">City *</label>
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">State/Province *</label>
                        <input
                            type="text"
                            value={state}
                            onChange={(e) => setState(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Postal Code *</label>
                        <input
                            type="text"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">Country</label>
                        <input
                            type="text"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            placeholder="USA"
                            className="w-full px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-lg transition-colors"
                >
                    Continue to Payment
                </button>
            </form>
        );
    }

    return (
        <form onSubmit={handlePayment} className="space-y-6">
            <div className="bg-zinc-50 dark:bg-zinc-800 p-4 rounded-lg mb-4">
                <h3 className="font-semibold text-zinc-900 dark:text-white mb-2">Shipping To:</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {fullName}<br />
                    {addressLine1}{addressLine2 && `, ${addressLine2}`}<br />
                    {city}, {state} {postalCode}<br />
                    {phone}
                </p>
                <button
                    type="button"
                    onClick={() => setShowAddressForm(true)}
                    className="text-sm text-indigo-600 hover:text-indigo-500 mt-2"
                >
                    Edit Address
                </button>
            </div>

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
        return <div className="p-8 text-center text-zinc-500">Cart is empty cannot proceed to checkout.</div>;
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-4">
            <div className="bg-white dark:bg-zinc-900 w-full max-w-2xl p-8 rounded-2xl shadow-xl border border-zinc-200 dark:border-zinc-800">
                <h1 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Secure Checkout</h1>
                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            </div>
        </div>
    );
}

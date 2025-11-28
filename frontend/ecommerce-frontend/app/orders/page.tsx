'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import OrderHistory from '../components/OrderHistory';
import Navbar from '../components/Navbar';
import { Customer } from '@/app/api/productService';

export default function OrdersPage() {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const router = useRouter();

    useEffect(() => {
        // Check if customer is already registered in localStorage
        const savedCustomer = localStorage.getItem('customer');
        if (savedCustomer) {
            try {
                setCustomer(JSON.parse(savedCustomer));
            } catch (e) {
                console.error('Failed to parse customer data:', e);
                localStorage.removeItem('customer');
                router.push('/checkout');
            }
        } else {
            // Redirect to checkout if not logged in
            router.push('/checkout');
        }
    }, [router]);

    const handleLogout = () => {
        setCustomer(null);
        localStorage.removeItem('customer');
        localStorage.removeItem('cart');
        router.push('/');
    };
    if (!customer) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <OrderHistory customerId={customer.id} />
            </main>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Customer } from '@/app/api/productService';
import Cart from './CartComponent';

export default function Navbar() {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const router = useRouter();

    useEffect(() => {
        const checkAuth = () => {
            const savedCustomer = localStorage.getItem('customer');
            if (savedCustomer) {
                try {
                    setCustomer(JSON.parse(savedCustomer));
                } catch (e) {
                    console.error('Failed to parse customer data:', e);
                }
            } else {
                setCustomer(null);
            }
        };

        checkAuth();
        // Listen for storage events to update state across tabs/components
        window.addEventListener('storage', checkAuth);
        // Custom event for immediate updates within the same window
        window.addEventListener('customer-updated', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
            window.removeEventListener('customer-updated', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('customer');
        localStorage.removeItem('cart');
        setCustomer(null);
        window.dispatchEvent(new Event('customer-updated'));
        router.push('/');
    };

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="flex items-center gap-8">
                    <Link href="/" className="text-2xl font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                        E-Commerce Store
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        <Link href="/" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                            Shop
                        </Link>
                        {customer && (
                            <Link href="/orders" className="text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors">
                                My Orders
                            </Link>
                        )}
                    </nav>
                </div>

                <div className="flex items-center gap-6">
                    <Cart />

                    {customer ? (
                        <div className="flex items-center gap-4">
                            <span className="text-sm text-gray-600 hidden sm:inline">
                                Hi, <span className="font-semibold text-gray-900">{customer.firstName}</span>
                            </span>
                            <button
                                onClick={handleLogout}
                                className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                            >
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/checkout"
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                            Sign In / Checkout
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

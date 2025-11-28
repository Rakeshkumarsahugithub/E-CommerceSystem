'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Customer } from '@/app/api/productService';
import Cart from './CartComponent';

export default function Navbar() {
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
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
        setIsMenuOpen(false);
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
                        <div className="hidden md:flex items-center gap-4">
                            <span className="text-sm text-gray-600">
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
                            className="hidden md:block text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                            Sign In / Checkout
                        </Link>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Shop
                        </Link>
                        {customer && (
                            <Link
                                href="/orders"
                                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                My Orders
                            </Link>
                        )}
                        {customer ? (
                            <div className="px-3 py-2 border-t border-gray-100 mt-2">
                                <div className="text-sm text-gray-500 mb-2">
                                    Signed in as <span className="font-medium text-gray-900">{customer.firstName}</span>
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left text-base font-medium text-red-600 hover:text-red-800"
                                >
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/checkout"
                                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-800 hover:bg-gray-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Sign In / Checkout
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

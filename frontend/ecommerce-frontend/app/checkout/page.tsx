'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CustomerForm from '../components/CustomerForm';
import Navbar from '../components/Navbar';
import CheckoutForm from '../components/CheckoutForm';
import { Customer } from '../api/productService';

export default function CheckoutPage() {
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
      }
    }
  }, []);

  const handleCustomerCreated = (newCustomer: Customer) => {
    setCustomer(newCustomer);
    // Save to localStorage
    localStorage.setItem('customer', JSON.stringify(newCustomer));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {!customer ? (
              <CustomerForm onCustomerCreated={handleCustomerCreated} />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-xl font-bold mb-4 text-gray-900">Customer Information</h2>
                    <p className="text-gray-800 mb-2"><strong className="text-gray-700">Name:</strong> {customer.firstName} {customer.lastName}</p>
                    <p className="text-gray-800 mb-2"><strong className="text-gray-700">Email:</strong> {customer.email}</p>
                    <p className="text-gray-800 mb-2"><strong className="text-gray-700">Address:</strong> {customer.address}</p>
                    <p className="text-gray-800"><strong className="text-gray-700">Phone:</strong> {customer.phone}</p>
                  </div>
                </div>
                <div>
                  <CheckoutForm customerId={customer.id} onOrderPlaced={() => { }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
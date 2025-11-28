'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/cart-context';
import { createOrder, CreateOrderRequest } from '@/app/api/productService';
import SuccessModal from './SuccessModal';

export default function CheckoutForm({ customerId, onOrderPlaced }: { customerId: number; onOrderPlaced: () => void }) {
  const { cartItems, clearCart, getTotalPrice } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      setError('Your cart is empty');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const orderRequest: CreateOrderRequest = {
        customerId,
        products: cartItems.map(item => ({
          id: item.productId,
          quantity: item.quantity
        })),
        totalAmount: getTotalPrice()
      };

      const order = await createOrder(orderRequest);
      console.log('Order created:', order);

      // Show success modal
      setShowSuccessModal(true);

      // Clear the cart
      clearCart();

      // Notify parent component
      onOrderPlaced();

    } catch (err) {
      setError('Failed to place order');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    router.push('/'); // Redirect to home/products page
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseModal}
        message="Your order has been placed successfully! Thank you for shopping with us."
      />

      <h2 className="text-xl font-bold mb-4 text-gray-900">Order Summary</h2>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-gray-700">Items in your cart:</h3>
        <ul className="space-y-2">
          {cartItems.map(item => (
            <li key={item.id} className="flex justify-between text-gray-800">
              <span>{item.name} x {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t pt-4">
        <div className="flex justify-between font-bold text-lg text-gray-900">
          <span>Total:</span>
          <span>${getTotalPrice().toFixed(2)}</span>
        </div>
      </div>

      <button
        onClick={handlePlaceOrder}
        disabled={loading || cartItems.length === 0}
        className={`mt-6 w-full py-3 px-4 rounded font-bold text-white ${loading || cartItems.length === 0
          ? 'bg-gray-400 cursor-not-allowed'
          : 'bg-green-500 hover:bg-green-700'
          }`}
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </div>
  );
}
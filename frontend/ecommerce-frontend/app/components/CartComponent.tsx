'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/cart-context';

interface CartItem {
    id: number;
    productId: number;
    name: string;
    price: number;
    quantity: number;
}

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleCheckout = () => {
        // Redirect to checkout page
        router.push('/checkout');
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Cart ({getTotalItems()})
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-10">
                    <div className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Shopping Cart</h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                Close
                            </button>
                        </div>

                        {cartItems.length === 0 ? (
                            <p className="text-gray-700">Your cart is empty</p>
                        ) : (
                            <>
                                <div className="max-h-60 overflow-y-auto">
                                    {cartItems.map(item => (
                                        <div key={item.id} className="flex justify-between items-center py-2 border-b">
                                            <div>
                                                <p className="font-medium text-gray-900">{item.name}</p>
                                                <p className="text-sm text-black">${Number(item.price).toFixed(2)} x {item.quantity}</p>
                                            </div>
                                            <div className="flex items-center">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                >
                                                    -
                                                </button>
                                                <span className="mx-2 text-black">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => removeFromCart(item.id)}
                                                    className="ml-2 text-red-500 hover:text-red-700"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="mt-4 pt-4 border-t">
                                    <div className="flex justify-between font-bold text-gray-900">
                                        <span>Total:</span>
                                        <span>${getTotalPrice().toFixed(2)}</span>
                                    </div>
                                    <button
                                        onClick={handleCheckout}
                                        className="mt-4 w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

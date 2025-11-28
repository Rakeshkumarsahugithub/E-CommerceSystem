'use client';

import { useState, useEffect } from 'react';
import { getProducts, Product } from '@/app/api/productService';
import { useCart } from '../context/cart-context';

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const products = await getProducts();
      setProducts(products);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="border rounded-lg p-4 shadow-md bg-white">
          <h3 className="text-xl font-bold mb-2 text-gray-900">{product.name}</h3>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">${Number(product.price).toFixed(2)}</span>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
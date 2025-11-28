'use client';



import ProductList from './components/ProductList';
import Navbar from './components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Products</h2>
            <ProductList />
          </div>
        </div>
      </main>
    </div>
  );
}

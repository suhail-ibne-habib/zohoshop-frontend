import React from 'react';
import AddProductForm from '@/components/seller/AddProductForm';

export const metadata = {
  title: 'Add Product | Cohoshop Seller',
  description: 'Add a new product to your seller account catalog on Cohoshop.',
};

export default function AddProductPage() {
  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">Add New Product</h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Fill in details, pricing, and images to publish a new product listing in your seller catalog.
          </p>
        </div>
      </div>
      
      <AddProductForm />
    </div>
  );
}

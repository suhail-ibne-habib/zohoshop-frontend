import React from 'react';
import AddProductForm from '@/components/saler/AddProductForm';

export const metadata = {
  title: 'Add Product | CoHoShop Saler',
  description: 'Add a new product to your seller account.',
};

export default function AddProductPage() {
  return (
    <div className="w-full">
      <div className="mb-6 flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add Product</h1>
          <p className="text-sm text-gray-500 mt-1">Create a new listing in your store catalog.</p>
        </div>
      </div>
      
      <AddProductForm />
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { CarFront, Home, Monitor, Sofa, Briefcase, PenTool } from 'lucide-react';

const categories = [
  { name: 'Cars', icon: CarFront, bg: 'bg-blue-100', text: 'text-blue-600' },
  { name: 'Property', icon: Home, bg: 'bg-cyan-100', text: 'text-cyan-600' },
  { name: 'Electronics', icon: Monitor, bg: 'bg-gray-200', text: 'text-gray-700' },
  { name: 'Home & Garden', icon: Sofa, bg: 'bg-gray-100', text: 'text-gray-500' },
  { name: 'Jobs', icon: Briefcase, bg: 'bg-blue-100', text: 'text-blue-600' },
  { name: 'Services', icon: PenTool, bg: 'bg-cyan-100', text: 'text-cyan-600' },
];

export default function Categories() {
  return (
    <section className="flex flex-col gap-6 w-full">
      <h2 className="text-xl font-bold text-gray-900">Featured Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((cat, idx) => (
          <Link key={idx} href={`/search?category=${cat.name}`} className="group flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/5 transition-all duration-300 gap-3">
            <div className={`w-12 h-12 rounded-full ${cat.bg} flex items-center justify-center ${cat.text} group-hover:scale-110 transition-transform duration-300`}>
              <cat.icon size={24} />
            </div>
            <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{cat.name}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

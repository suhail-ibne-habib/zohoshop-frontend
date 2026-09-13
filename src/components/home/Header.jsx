"use client";

import React from 'react';
import Link from 'next/link';
import { Show, UserButton, UserProfile } from '@clerk/nextjs';

export default function Header() {
  return (
    <>
      {/* TopNavBar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-10 flex items-center justify-between h-16">
          <div className="text-2xl font-bold text-[#004ccd] mr-8 font-sans tracking-tight">
            Cohoshop
          </div>
          <nav className="flex-1 flex items-center space-x-6">
            <Link className="text-sm font-medium text-gray-600 hover:text-[#004ccd] transition-colors" href="/products">All Products</Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-[#004ccd] transition-colors" href="/search?category=Cars">Cars</Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-[#004ccd] transition-colors" href="/search?category=Property">Property</Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-[#004ccd] transition-colors" href="/search?category=Electronics">Electronics</Link>
            <Link className="text-sm font-bold text-[#004ccd]" href="/">Home</Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-[#004ccd] transition-colors" href="/search?category=Jobs">Jobs</Link>
            <Link className="text-sm font-medium text-gray-600 hover:text-[#004ccd] transition-colors" href="/search?category=Services">Services</Link>
          </nav>
          <div className="flex items-center space-x-4 ml-8">
            <button aria-label="location" className="text-gray-500 hover:text-[#004ccd] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
            </button>
            <button aria-label="notifications" className="text-gray-500 hover:text-[#004ccd] transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></svg>
            </button>
            <Show when="signed-in">
              <UserButton showName />
            </Show>
            <Link className="bg-[#004ccd] text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors" href="/seller/products/add">
              Post Ad
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Top App Bar */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md shadow-sm flex items-center justify-between px-4 h-16 md:hidden">
        <div className="text-xl font-bold text-[#004ccd]">
          Cohoshop
        </div>
        <Link className="bg-[#004ccd] text-white text-sm font-medium px-3 py-1.5 rounded-lg" href="/seller/products/add">
          Post Ad
        </Link>
      </header>
    </>
  );
}

import React from 'react';
import Header from '@/components/home/Header';
import Hero from '@/components/home/Hero';
import Categories from '@/components/home/Categories';
import TrendingListings from '@/components/home/TrendingListings';
import AdBanner from '@/components/home/AdBanner';
import Footer from '@/components/home/Footer';

export const metadata = {
  title: 'Cohoshop Classifieds - Find what you need',
  description: 'Connecting local communities to buy, sell, and trade with trust and transparency.',
};

export default function HomePage() {
  return (
    <div className="bg-white text-gray-900 antialiased min-h-screen flex flex-col pt-16 font-sans">
      <Header />
      
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-12 flex flex-col gap-16">
        <Hero />
        <Categories />
        <TrendingListings />
        <AdBanner />
      </main>
      
      <Footer />
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { ArrowRight, Sparkles, User, Loader2, Image as ImageIcon } from 'lucide-react';

const fallbackListings = [
  {
    _id: 'sample-1',
    title: '2020 Honda Civic EX',
    description: 'Excellent condition, single owner, low mileage. Full service history available upon request.',
    price: 18500,
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'sample-2',
    title: 'Modern 2BR Apartment',
    description: 'Newly renovated with in-unit laundry, gym access, and covered parking included.',
    price: 1800,
    salePrice: 1500,
    onsale: true,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1c24240f58?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'sample-3',
    title: 'MacBook Pro M2',
    description: '16GB RAM, 512GB SSD. Flawless screen, barely used. Comes with original charger.',
    price: 1450,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800',
  },
  {
    _id: 'sample-4',
    title: 'Mid-Century Armchair',
    description: 'Vintage reproduction. Solid oak frame with gray linen upholstery. Minor wear.',
    price: 350,
    salePrice: 280,
    onsale: true,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=800',
  },
];

export default function TrendingListings() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTrendingProducts() {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
        const response = await axios.get(`${baseUrl}/product/all`);
        if (response.data?.data && response.data.data.length > 0) {
          setProducts(response.data.data);
        } else {
          setProducts(fallbackListings);
        }
      } catch (err) {
        console.error('Failed to fetch trending products:', err);
        setProducts(fallbackListings);
      } finally {
        setLoading(false);
      }
    }
    loadTrendingProducts();
  }, []);

  const displayListings = products.slice(0, 8);

  return (
    <section className="flex flex-col gap-6 w-full pt-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            Trending Published Products
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">Explore recent product listings added by local sellers</p>
        </div>

        <Link
          href="/products"
          className="text-xs font-semibold text-[#006877] hover:text-[#004e5a] flex items-center gap-1 group"
        >
          <span>View All Products</span>
          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 gap-2 text-gray-400">
          <Loader2 className="w-6 h-6 animate-spin text-[#006877]" />
          <span className="text-xs">Loading live products...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayListings.map((item) => {
            const isSale = item.onsale && item.salePrice;
            const discountPercent =
              isSale && item.price > 0 && item.salePrice < item.price
                ? Math.round(((item.price - item.salePrice) / item.price) * 100)
                : null;

            return (
              <div
                key={item._id}
                className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#006877]/40 hover:shadow-xl hover:shadow-[#006877]/5 transition-all duration-300"
              >
                <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
                  {item.image ? (
                    <img
                      alt={item.title}
                      src={item.image}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                      <ImageIcon className="w-8 h-8" />
                    </div>
                  )}

                  {discountPercent !== null && (
                    <div className="absolute top-3 right-3 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md flex items-center gap-0.5">
                      <Sparkles size={10} />
                      {discountPercent}% OFF
                    </div>
                  )}

                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-md shadow-sm border border-gray-100 flex items-baseline gap-1">
                    {isSale ? (
                      <>
                        <span className="text-xs font-bold text-[#006877]">
                          GH₵ {Number(item.salePrice).toFixed(2)}
                        </span>
                        <span className="text-[10px] text-gray-400 line-through">
                          GH₵ {Number(item.price).toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="text-xs font-bold text-[#006877]">
                        GH₵ {Number(item.price).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 flex flex-col gap-2 flex-1">
                  <h3 className="text-sm font-semibold text-gray-900 line-clamp-1 group-hover:text-[#006877] transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {item.description.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ')}
                    </p>
                  )}

                  <div className="mt-auto pt-3 flex items-center justify-between border-t border-gray-100">
                    <div className="flex items-center text-gray-500 gap-1">
                      <User size={12} className="text-[#006877]" />
                      <span className="text-[11px] text-gray-500 truncate max-w-[100px]">
                        {item.owner?.fullName || 'Seller'}
                      </span>
                    </div>

                    <Link
                      href={item._id.startsWith('sample') ? '/products' : `/products/${item._id}`}
                      className="text-xs font-medium text-[#006877] border border-[#006877]/20 px-2.5 py-1 rounded hover:bg-[#006877]/5 transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';
import ProductCard from '@/components/products/ProductCard';

import {
  Search,
  Filter,
  Loader2,
  Package,
  Sparkles,
  SlidersHorizontal,
  RefreshCw,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyOnSale, setOnlyOnSale] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
      const res = await axios.get(`${baseUrl}/product/all`);
      if (res.data?.data) {
        setProducts(res.data.data);
      }
    } catch (err) {
      console.error('Error fetching published products:', err);
      setError(err.response?.data?.message || 'Failed to load products. Please check server connection.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter & Sort logic
  const filteredProducts = products
    .filter((item) => {
      const matchesSearch =
        item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSale = onlyOnSale ? item.onsale : true;
      return matchesSearch && matchesSale;
    })
    .sort((a, b) => {
      const priceA = a.onsale && a.salePrice ? a.salePrice : a.price;
      const priceB = b.onsale && b.salePrice ? b.salePrice : b.price;

      if (sortBy === 'price-low') return priceA - priceB;
      if (sortBy === 'price-high') return priceB - priceA;
      // Default: newest
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  return (
    <div className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col pt-16 font-sans">
      <Header />

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Page Banner */}
        <div className="bg-gradient-to-r from-[#006877] to-[#004e5a] text-white rounded-2xl p-8 shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-2xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-emerald-300 border border-white/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              Live Marketplace Catalog
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Explore Published Products
            </h1>
            <p className="text-sm md:text-base text-gray-200 leading-relaxed">
              Browse authentic local listings, verify prices, and connect directly with sellers.
            </p>
          </div>

          <div className="absolute right-0 bottom-0 opacity-10 translate-x-8 translate-y-8 pointer-events-none">
            <Package className="w-80 h-80 text-white" />
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by title or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 text-sm border-gray-200 focus-visible:ring-[#006877]"
            />
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
            <button
              type="button"
              onClick={() => setOnlyOnSale(!onlyOnSale)}
              className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg border transition-all ${
                onlyOnSale
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>On Sale Only</span>
            </button>

            <div className="flex items-center gap-2 bg-white border border-gray-200 px-3 py-2 rounded-lg text-xs">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gray-500" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none font-medium text-gray-700 cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={fetchProducts}
              className="h-9 px-3 text-xs gap-1.5"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </Button>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-[#006877]" />
            <p className="text-sm font-medium">Fetching published listings...</p>
          </div>
        )}

        {/* Error Alert */}
        {error && !loading && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-800 text-sm flex items-center justify-between">
            <span>{error}</span>
            <Button size="sm" variant="destructive" onClick={fetchProducts}>
              Try Again
            </Button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-200 p-12 text-center flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                  <Package className="w-8 h-8" />
                </div>
                <div className="max-w-md space-y-1">
                  <h3 className="text-lg font-semibold text-gray-900">No products found</h3>
                  <p className="text-xs text-gray-500">
                    {searchQuery || onlyOnSale
                      ? 'Try adjusting your search criteria or clearing filters.'
                      : 'No products have been published yet. Be the first to list a product!'}
                  </p>
                </div>
                {(searchQuery || onlyOnSale) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setSearchQuery('');
                      setOnlyOnSale(false);
                    }}
                  >
                    Reset Filters
                  </Button>
                )}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}

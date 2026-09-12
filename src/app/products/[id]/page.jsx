"use client";

import React, { useState, useEffect, use } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Header from '@/components/home/Header';
import Footer from '@/components/home/Footer';

import {
  ArrowLeft,
  Tag,
  DollarSign,
  User,
  Mail,
  Calendar,
  Sparkles,
  Loader2,
  AlertCircle,
  PackageCheck,
  Share2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      setError(null);
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
        const res = await axios.get(`${baseUrl}/product/${productId}`);
        if (res.data?.data) {
          setProduct(res.data.data);
          setActiveImage(res.data.data.image);
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError(err.response?.data?.message || 'Failed to load product details.');
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex flex-col pt-16 font-sans">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-24 gap-3 text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#006877]" />
          <p className="text-sm font-medium">Loading listing details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="bg-white min-h-screen flex flex-col pt-16 font-sans">
        <Header />
        <div className="flex-1 max-w-4xl mx-auto px-4 py-16 flex flex-col items-center justify-center text-center space-y-4">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <h2 className="text-xl font-bold text-gray-900">Product Not Found</h2>
          <p className="text-sm text-gray-500">{error || 'The requested product listing does not exist.'}</p>
          <Link href="/products">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="w-4 h-4" /> Back to Products
            </Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const { title, price, salePrice, onsale, description, gallery, owner, createdAt, availability } = product;

  const discountPercent =
    onsale && price > 0 && salePrice > 0 && salePrice < price
      ? Math.round(((price - salePrice) / price) * 100)
      : null;

  const allImages = [product.image, ...(gallery || [])].filter(Boolean);

  return (
    <div className="bg-gray-50 text-gray-900 antialiased min-h-screen flex flex-col pt-16 font-sans">
      <Header />

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-8 space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between">
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-[#006877] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Products</span>
          </Link>

          <Button variant="ghost" size="sm" className="text-xs text-gray-500 gap-1">
            <Share2 className="w-3.5 h-3.5" /> Share Listing
          </Button>
        </div>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Media Gallery */}
          <div className="lg:col-span-7 space-y-4">
            <div className="aspect-[4/3] w-full bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden relative">
              <img
                src={activeImage || product.image}
                alt={title}
                className="w-full h-full object-cover"
              />

              {discountPercent !== null && (
                <div className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-extrabold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  {discountPercent}% OFF
                </div>
              )}
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {allImages.map((imgUrl, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                      activeImage === imgUrl ? 'border-[#006877] ring-2 ring-[#006877]/20 scale-105' : 'border-gray-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Pricing & Product Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-xs space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2.5 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
                    <PackageCheck className="w-3 h-3" /> Active Listing
                  </span>
                  {availability !== undefined && (
                    <span className={`px-2.5 py-0.5 rounded-md text-xs font-semibold inline-flex items-center gap-1 ${availability ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                      {availability ? 'Available' : 'Unavailable'}
                    </span>
                  )}
                </div>
                <h1 className="text-2xl font-bold text-gray-900 leading-snug">{title}</h1>
              </div>

              {/* Price Display */}
              <div className="p-4 bg-gray-50/80 rounded-xl border border-gray-100 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-400 font-medium block mb-1">Selling Price</span>
                  {onsale && salePrice ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-extrabold text-[#006877]">
                        ${Number(salePrice).toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-400 line-through">
                        ${Number(price).toFixed(2)}
                      </span>
                    </div>
                  ) : (
                    <span className="text-3xl font-extrabold text-[#006877]">
                      ${Number(price).toFixed(2)}
                    </span>
                  )}
                </div>

                {discountPercent !== null && (
                  <span className="text-xs font-bold text-amber-700 bg-amber-100 border border-amber-200 px-2.5 py-1 rounded-md">
                    Save {discountPercent}%
                  </span>
                )}
              </div>

              {/* Seller Information */}
              <div className="pt-4 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Seller Information</h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#006877]/10 flex items-center justify-center text-[#006877] font-bold text-sm">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-sm font-semibold text-gray-900">
                      {owner?.fullName || owner?.email || 'Registered Local Seller'}
                    </h5>
                    <p className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> Listed on {new Date(createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {owner?.email && (
                  <div className="pt-2">
                    <a
                      href={`mailto:${owner.email}?subject=Inquiry about ${encodeURIComponent(title)}`}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#006877] text-white text-sm font-semibold rounded-lg hover:bg-[#004e5a] transition-all shadow-xs"
                    >
                      <Mail className="w-4 h-4" /> Contact Seller via Email
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Full Description Section */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-xs space-y-4">
          <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#006877]" /> Full Description & Details
          </h3>

          {description ? (
            <div
              className="text-sm text-gray-700 leading-relaxed prose max-w-none"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          ) : (
            <p className="text-sm text-gray-400 italic">No additional description provided for this listing.</p>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

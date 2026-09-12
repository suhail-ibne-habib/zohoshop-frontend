"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useAuth } from '@clerk/nextjs';

import {
  PackagePlus,
  Package,
  Sparkles,
  DollarSign,
  Loader2,
  AlertCircle,
  ExternalLink,
  PlusCircle,
  RefreshCw,
  Tag,
  CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

export default function SellerProductsDashboardPage() {
  const { getToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSellerProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getToken();
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';
      
      const response = await axios.get(`${baseUrl}/product/my-products`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (response.data?.data) {
        setProducts(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching seller products:', err);
      setError(
        err.response?.data?.message ||
          err.message ||
          'Failed to load your seller products catalog.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerProducts();
  }, []);

  // Stats calculation
  const totalProducts = products.length;
  const totalOnSale = products.filter((p) => p.onsale).length;
  const totalValue = products.reduce((acc, p) => acc + (p.onsale && p.salePrice ? p.salePrice : p.price || 0), 0);

  return (
    <div className="space-y-8 font-sans pb-12 max-w-6xl mx-auto">
      {/* Top Banner & Primary Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-200 shadow-xs">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            <Package className="w-6 h-6 text-[#006877]" />
            My Products Catalog
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Manage your published items, monitor active pricing, and add new product listings.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={fetchSellerProducts}
            disabled={loading}
            className="gap-1.5 text-xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </Button>

          <Link href="/saler/products/add">
            <Button className="gap-2 text-xs font-semibold">
              <PlusCircle className="w-4 h-4" />
              <span>Add New Product</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-white to-gray-50/50">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Published</p>
              <h3 className="text-3xl font-extrabold text-gray-900 mt-1">{totalProducts}</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Active listings in catalog</p>
            </div>
            <div className="p-3 bg-[#006877]/10 rounded-xl text-[#006877]">
              <Package className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-amber-50/30">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-amber-700 uppercase tracking-wider">On Sale Items</p>
              <h3 className="text-3xl font-extrabold text-amber-900 mt-1">{totalOnSale}</h3>
              <p className="text-[11px] text-amber-600/80 mt-0.5">Promotions currently live</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-xl text-amber-700">
              <Sparkles className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-white to-emerald-50/30">
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-emerald-700 uppercase tracking-wider">Catalog Value</p>
              <h3 className="text-3xl font-extrabold text-emerald-900 mt-1">${totalValue.toFixed(2)}</h3>
              <p className="text-[11px] text-emerald-600/80 mt-0.5">Estimated total inventory</p>
            </div>
            <div className="p-3 bg-emerald-100 rounded-xl text-emerald-700">
              <DollarSign className="w-6 h-6" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Catalog List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-[#006877]" />
            <CardTitle>Your Published Items ({products.length})</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-gray-500">
              <Loader2 className="w-7 h-7 animate-spin text-[#006877]" />
              <p className="text-xs font-medium">Loading your listings...</p>
            </div>
          ) : error ? (
            <div className="p-8 text-center space-y-3">
              <AlertCircle className="w-8 h-8 text-red-500 mx-auto" />
              <p className="text-sm font-semibold text-red-700">{error}</p>
              <Button size="sm" variant="outline" onClick={fetchSellerProducts}>
                Try Again
              </Button>
            </div>
          ) : products.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400">
                <PackagePlus className="w-8 h-8 text-[#006877]" />
              </div>
              <div className="max-w-md space-y-1">
                <h3 className="text-base font-bold text-gray-900">No products published yet</h3>
                <p className="text-xs text-gray-500">
                  You haven't listed any products. Publish your first item to start receiving local inquiries.
                </p>
              </div>
              <Link href="/saler/products/add">
                <Button size="sm" className="gap-2 font-semibold">
                  <PlusCircle className="w-4 h-4" /> Add Product Now
                </Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 overflow-x-auto">
              {products.map((item) => {
                const discount =
                  item.onsale && item.price > 0 && item.salePrice < item.price
                    ? Math.round(((item.price - item.salePrice) / item.price) * 100)
                    : null;

                return (
                  <div
                    key={item._id}
                    className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-gray-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-16 h-16 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {item.title}
                          </h4>
                          {item.onsale && (
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
                              {discount ? `${discount}% OFF` : 'ON SALE'}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 flex items-center gap-2">
                          <span>Added {new Date(item.createdAt).toLocaleDateString()}</span>
                          <span>•</span>
                          <span className="text-emerald-600 font-medium inline-flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" /> Live Listing
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-6 shrink-0">
                      <div className="text-right">
                        {item.onsale && item.salePrice ? (
                          <>
                            <div className="text-sm font-extrabold text-[#006877]">
                              ${Number(item.salePrice).toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-400 line-through">
                              ${Number(item.price).toFixed(2)}
                            </div>
                          </>
                        ) : (
                          <div className="text-sm font-extrabold text-[#006877]">
                            ${Number(item.price).toFixed(2)}
                          </div>
                        )}
                      </div>

                      <Link href={`/products/${item._id}`} target="_blank">
                        <Button variant="outline" size="sm" className="gap-1 text-xs">
                          <span>View</span>
                          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

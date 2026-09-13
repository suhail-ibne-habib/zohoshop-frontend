"use client";

import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@clerk/nextjs';
import { productSchema } from '@/lib/schemas/product';

import FormField from './form/FormField';
import SingleImageUpload from './form/SingleImageUpload';
import GalleryUpload from './form/GalleryUpload';
import RichTextEditor from './form/RichTextEditor';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

import {
  CheckCircle2,
  AlertCircle,
  Loader2,
  Tag,
  DollarSign,
  FileText,
  Image as ImageIcon,
  PackagePlus,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export default function AddProductForm() {
  const { getToken } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: '',
      price: '',
      salePrice: '',
      availability: 'true',
      stock: '1',
      description: '',
      image: null,
      gallery: [],
    },
  });

  const watchPrice = watch('price');
  const watchSalePrice = watch('salePrice');

  // Calculate live discount percentage for seller preview
  const numPrice = Number(watchPrice);
  const numSalePrice = Number(watchSalePrice);
  const discountPercent =
    numPrice > 0 && numSalePrice > 0 && numSalePrice < numPrice
      ? Math.round(((numPrice - numSalePrice) / numPrice) * 100)
      : null;

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setServerError(null);
    setIsSuccess(false);

    try {
      // 1. Retrieve auth token safely inside submission handler
      const token = await getToken();
      console.log('Frontend Auth Token:', token ? 'Token acquired' : 'No token found (user not logged in)');

      if (!token) {
        setServerError('Authentication required. Please sign in to publish products.');
        setIsSubmitting(false);
        return;
      }

      // 2. Build FormData payload for file & text fields
      const formData = new FormData();
      formData.append('title', data.title.trim());
      formData.append('price', data.price);

      if (data.salePrice !== undefined && data.salePrice !== null && data.salePrice !== '') {
        formData.append('salePrice', data.salePrice);
      }
      if (data.availability !== undefined) {
        formData.append('availability', data.availability);
      }
      if (data.stock !== undefined && data.stock !== null && data.stock !== '') {
        formData.append('stock', data.stock);
      }
      if (data.description) {
        formData.append('description', data.description);
      }

      // Main cover image
      if (data.image instanceof File) {
        formData.append('image', data.image);
      }

      // Gallery images
      if (Array.isArray(data.gallery)) {
        data.gallery.forEach((file) => {
          if (file instanceof File) {
            formData.append('gallery', file);
          }
        });
      }

      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

      // 3. Send request using Axios
      const response = await axios.post(`${baseUrl}/product/create-product`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        reset();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } catch (err) {
      console.error('Product creation error:', err);
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        'An unexpected error occurred. Please try again.';
      setServerError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 font-sans pb-12 w-full">
      {/* Global Success Banner */}
      {isSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start justify-between gap-3 text-emerald-800 shadow-xs animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600 shrink-0">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold">Product Published Successfully!</h4>
              <p className="text-xs text-emerald-600 mt-0.5">
                Your new product listing is live and visible in your seller catalog.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsSuccess(false)}
            className="text-xs text-emerald-700 hover:text-emerald-900 font-medium underline shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Global Server Error Alert */}
      {serverError && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 text-red-800 shadow-xs animate-fadeIn">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-semibold">Error Submitting Form</h4>
            <p className="text-xs text-red-600 mt-0.5 break-words">{serverError}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Section 1: General Details */}
        <Card className="border border-gray-200 shadow-xs rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-2 p-4 sm:p-6 bg-gray-50/50 border-b border-gray-100">
            <Tag className="w-4 h-4 text-[#006877] shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Basic Details</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            <FormField
              id="title"
              label="Product Title"
              required
              error={errors.title}
              hint="Enter a clear, descriptive title for your product"
            >
              <Input
                id="title"
                type="text"
                {...register('title')}
                disabled={isSubmitting}
                placeholder="e.g. Handmade Ceramic Coffee Mug (350ml)"
                className={`w-full ${errors.title ? 'border-red-300 bg-red-50/30 focus-visible:ring-red-500' : ''}`}
              />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                id="stock"
                label="Stock Quantity"
                required
                error={errors.stock}
                hint="Number of items available"
              >
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  {...register('stock')}
                  disabled={isSubmitting}
                  placeholder="1"
                  className={`w-full ${errors.stock ? 'border-red-300 bg-red-50/30 focus-visible:ring-red-500' : ''}`}
                />
              </FormField>

              <FormField
                id="availability"
                label="Availability"
                required
                error={errors.availability}
                hint="Specify the availability status"
              >
                <select
                  id="availability"
                  {...register('availability')}
                  disabled={isSubmitting}
                  className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${
                    errors.availability ? 'border-red-300 bg-red-50/30 focus-visible:ring-red-500' : ''
                  }`}
                >
                  <option value="true">Available</option>
                  <option value="false">Unavailable</option>
                </select>
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Section 2: Pricing & Discount Offers */}
        <Card className="border border-gray-200 shadow-xs rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between p-4 sm:p-6 bg-gray-50/50 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#006877] shrink-0" />
              <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Pricing & Offers</CardTitle>
            </div>
            {discountPercent !== null && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
                <Sparkles className="w-3 h-3" />
                {discountPercent}% OFF
              </span>
            )}
          </CardHeader>
          <CardContent className="p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <FormField
              id="price"
              label="Regular Price (GH₵)"
              required
              error={errors.price}
              hint="Standard selling price in Ghana Cedi"
            >
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 text-xs font-bold">GH₵</span>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('price')}
                  disabled={isSubmitting}
                  placeholder="0.00"
                  className={`pl-12 w-full ${errors.price ? 'border-red-300 bg-red-50/30 focus-visible:ring-red-500' : ''}`}
                />
              </div>
            </FormField>

            <FormField
              id="salePrice"
              label="Sale Price (GH₵)"
              error={errors.salePrice}
              hint="Optional promotional price in Ghana Cedi"
            >
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-500 text-xs font-bold">GH₵</span>
                <Input
                  id="salePrice"
                  type="number"
                  step="0.01"
                  min="0"
                  {...register('salePrice')}
                  disabled={isSubmitting}
                  placeholder="Optional discount price"
                  className={`pl-12 w-full ${errors.salePrice ? 'border-red-300 bg-red-50/30 focus-visible:ring-red-500' : ''}`}
                />
              </div>
            </FormField>
          </CardContent>
        </Card>

        {/* Section 3: Product Description */}
        <Card className="border border-gray-200 shadow-xs rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-2 p-4 sm:p-6 bg-gray-50/50 border-b border-gray-100">
            <FileText className="w-4 h-4 text-[#006877] shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Product Description</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <FormField
              id="description"
              label="Full Description"
              required
              error={errors.description}
              hint="Use formatted text or raw HTML mode to craft a compelling product page"
            >
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <RichTextEditor
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.description}
                    disabled={isSubmitting}
                  />
                )}
              />
            </FormField>
          </CardContent>
        </Card>

        {/* Section 4: Media Gallery */}
        <Card className="border border-gray-200 shadow-xs rounded-xl overflow-hidden">
          <CardHeader className="flex flex-row items-center gap-2 p-4 sm:p-6 bg-gray-50/50 border-b border-gray-100">
            <ImageIcon className="w-4 h-4 text-[#006877] shrink-0" />
            <CardTitle className="text-base sm:text-lg font-bold text-gray-900">Product Media & Gallery</CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 space-y-6">
            <FormField
              id="image"
              label="Main Product Cover Image"
              required
              error={errors.image}
              hint="Featured cover image for your product card"
            >
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <SingleImageUpload
                    value={field.value}
                    onChange={field.onChange}
                    error={errors.image}
                    disabled={isSubmitting}
                  />
                )}
              />
            </FormField>

            <div className="pt-4 border-t border-gray-100">
              <FormField
                id="gallery"
                label="Product Gallery Images"
                error={errors.gallery}
                hint="Upload up to 5 additional images showing different angles or details"
              >
                <Controller
                  name="gallery"
                  control={control}
                  render={({ field }) => (
                    <GalleryUpload
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.gallery}
                      disabled={isSubmitting}
                    />
                  )}
                />
              </FormField>
            </div>
          </CardContent>
        </Card>

        {/* Bottom Actions Bar */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            disabled={isSubmitting}
            onClick={() => reset()}
            className="w-full sm:w-auto flex items-center justify-center gap-1.5"
          >
            <RefreshCw className="w-4 h-4 text-gray-500" />
            <span>Reset Form</span>
          </Button>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto flex items-center justify-center gap-2 font-semibold px-6 bg-[#006877] hover:bg-[#005562] text-white"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Publishing Product...</span>
              </>
            ) : (
              <>
                <PackagePlus className="w-4 h-4" />
                <span>Publish Product</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

"use client";

import React from 'react';
import Link from 'next/link';
import { Tag, Sparkles, User, ArrowRight, Image as ImageIcon } from 'lucide-react';

export default function ProductCard({ product }) {
  const { _id, title, price, salePrice, onsale, image, description, owner } = product;

  // Calculate discount percentage if product is on sale
  const discountPercent =
    onsale && price > 0 && salePrice > 0 && salePrice < price
      ? Math.round(((price - salePrice) / price) * 100)
      : null;

  return (
    <div className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-[#006877]/40 hover:shadow-xl hover:shadow-[#006877]/5 transition-all duration-300">
      {/* Cover Image Container */}
      <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
            <ImageIcon className="w-10 h-10" />
          </div>
        )}

        {/* Discount Badge */}
        {discountPercent !== null && (
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 animate-pulse">
            <Sparkles className="w-3 h-3" />
            {discountPercent}% OFF
          </div>
        )}

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg shadow-sm border border-gray-100 flex items-baseline gap-1.5">
          {onsale && salePrice ? (
            <>
              <span className="text-sm font-extrabold text-[#006877]">
                GH₵ {Number(salePrice).toFixed(2)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                GH₵ {Number(price).toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-sm font-extrabold text-[#006877]">
              GH₵ {Number(price).toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Details Container */}
      <div className="p-5 flex flex-col gap-2.5 flex-1">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1 group-hover:text-[#006877] transition-colors">
          {title}
        </h3>

        {description && (
          <div
            className="text-xs text-gray-500 line-clamp-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: description.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ') }}
          />
        )}

        <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center text-gray-500 gap-1.5">
            <div className="w-6 h-6 rounded-full bg-[#006877]/10 flex items-center justify-center text-[#006877]">
              <User size={12} />
            </div>
            <span className="text-xs font-medium text-gray-600 truncate max-w-[120px]">
              {owner?.fullName || owner?.email?.split('@')[0] || 'Local Seller'}
            </span>
          </div>

          <Link
            href={`/products/${_id}`}
            className="text-xs font-semibold text-[#006877] hover:text-[#004e5a] flex items-center gap-1 group/btn"
          >
            <span>View</span>
            <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}

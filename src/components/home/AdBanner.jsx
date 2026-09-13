import React from 'react';
import Link from 'next/link';
import { Megaphone, ArrowRight } from 'lucide-react';

export default function AdBanner() {
  return (
    <section className="w-full my-2">
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d2342] via-[#004ccd] to-[#006877] text-white shadow-xl border border-blue-900/40 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 group">
        {/* Background ambient light effects */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Banner Image Container */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative z-10">
          <div className="w-full max-w-md overflow-hidden rounded-xl border border-white/10 shadow-2xl transition-transform duration-300 group-hover:scale-[1.02]">
            <img
              src="/images/advertise-banner.jpg"
              alt="Advertise With Us - Cohoshop"
              className="w-full h-auto object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Content & Action Container */}
        <div className="w-full md:w-1/2 flex flex-col items-start gap-4 relative z-10 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-semibold backdrop-blur-sm border border-white/10">
            <Megaphone className="w-3.5 h-3.5" />
            <span>Featured Business Ads</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white leading-tight">
            Reach Thousands of Local Buyers Daily
          </h3>

          <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed">
            Boost your product visibility and get top-of-page placement for your listings on Cohoshop. Connect directly with targeted local shoppers today.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/seller/products/add"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-orange-500/20 transition-all duration-200"
            >
              <span>Promote Your Listing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="mailto:ads@cohoshop.com?subject=Advertise%20with%20Cohoshop"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-medium backdrop-blur-sm transition-colors border border-white/15"
            >
              Contact Ad Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

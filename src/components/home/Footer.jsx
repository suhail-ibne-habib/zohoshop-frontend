import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full mt-16 border-t border-gray-200 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8 items-start md:items-center">
        <div className="flex flex-col gap-2">
          <div className="text-2xl font-bold text-gray-900 tracking-tight">
            CoHoShop
          </div>
          <p className="text-sm font-medium text-gray-500 max-w-sm">
            Connecting local communities to buy, sell, and trade with trust and transparency.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 text-sm font-medium text-gray-500">
            <Link className="hover:text-[#004ccd] transition-colors" href="#">About Us</Link>
            <Link className="hover:text-[#004ccd] transition-colors" href="#">Safety Tips</Link>
            <Link className="hover:text-[#004ccd] transition-colors" href="#">Terms of Service</Link>
            <Link className="hover:text-[#004ccd] transition-colors" href="#">Privacy Policy</Link>
            <Link className="hover:text-[#004ccd] transition-colors" href="#">Contact Support</Link>
            <Link className="hover:text-[#004ccd] transition-colors" href="#">Help Center</Link>
          </div>
          <p className="text-sm text-gray-400">
            © 2024 CoHoShop Classifieds. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

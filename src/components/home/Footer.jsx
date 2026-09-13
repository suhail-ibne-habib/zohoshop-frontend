import React from 'react';
import Link from 'next/link';
import { Phone, Mail, MessageSquare, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full mt-16 border-t border-gray-200 bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Brand Column */}
        <div className="flex flex-col gap-3">
          <div className="text-2xl font-extrabold text-white tracking-tight">
            CoHoShop <span className="text-xs bg-[#006877] text-white px-2 py-0.5 rounded-full font-semibold">Ghana 🇬🇭</span>
          </div>
          <p className="text-sm font-normal text-gray-400 max-w-sm leading-relaxed">
            Connecting local buyer & seller communities across Ghana with trust, transparency, and instant communication.
          </p>
        </div>

        {/* Quick Links Column */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Quick Navigation</h4>
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-gray-300">
            <Link className="hover:text-white transition-colors" href="/products">All Listings</Link>
            <Link className="hover:text-white transition-colors" href="/seller/products/add">Post Free Ad</Link>
            <Link className="hover:text-white transition-colors" href="#">Safety Tips</Link>
            <Link className="hover:text-white transition-colors" href="#">Terms & Conditions</Link>
            <Link className="hover:text-white transition-colors" href="#">Privacy Policy</Link>
          </div>
        </div>

        {/* Contact Information Column */}
        <div className="flex flex-col gap-3">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Contact Seller & Support</h4>
          <div className="space-y-2 text-sm">
            <a
              href="tel:0546713433"
              className="flex items-center gap-2.5 text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>Call / SMS: 0546713433</span>
            </a>
            <a
              href="https://wa.me/233546713433"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-green-400 hover:text-green-300 transition-colors"
            >
              <MessageSquare className="w-4 h-4 shrink-0 text-green-400" />
              <span>WhatsApp: 0546713433</span>
            </a>
            <a
              href="mailto:support@cohoshop.com"
              className="flex items-center gap-2.5 text-gray-300 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 shrink-0 text-[#006877]" />
              <span>Email: support@cohoshop.com</span>
            </a>
            <div className="flex items-center gap-2.5 text-gray-400 text-xs pt-1">
              <MapPin className="w-4 h-4 shrink-0 text-amber-400" />
              <span>Accra, Ghana (Local Marketplace)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} CoHoShop Ghana Classifieds. All rights reserved. Prices in Ghana Cedi (GH₵).
      </div>
    </footer>
  );
}

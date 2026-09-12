"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, PlusCircle, Settings } from 'lucide-react';
import { Show, UserButton } from '@clerk/nextjs'

export default function SalerLayout({ children }) {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/saler/dashboard', icon: Home },
    { name: 'Products', href: '/saler/products', icon: Package },
    { name: 'Add Product', href: '/saler/products/add', icon: PlusCircle },
    { name: 'Settings', href: '/saler/settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-[#f9fafb] text-gray-900 font-sans w-full">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col shrink-0">
        <div className="h-16 flex items-center px-6 border-b border-gray-200 shrink-0">
          <span className="text-xl font-bold text-[#006877]">CoHoShop Saler</span>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-1 px-3 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md transition-colors text-sm font-medium ${isActive
                  ? 'bg-[#e0f7fa] text-[#006877]'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                <item.icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* <div className="p-4 border-t border-gray-200 shrink-0">
          <button className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium">
            <LogOut size={18} />
            <span>Sign out</span>
          </button>
        </div> */}
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-8 justify-between shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500 font-medium">
            <span>Saler</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 capitalize">
              {pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {/* User Profile or Actions */}
            {/* <div className="w-8 h-8 rounded-full bg-[#006877] text-white flex items-center justify-center font-bold text-sm">
               S
             </div> */}
            <Show when="signed-in">
              <UserButton showName />
            </Show>
          </div>
        </header>

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-8 bg-[#f9fafb]">
          <div className="max-w-5xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

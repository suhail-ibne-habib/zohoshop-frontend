import React from 'react';
import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/30 bg-surface/80 backdrop-blur">
      <div className="container mx-auto px-margin-mobile md:px-margin-desktop h-16 flex items-center justify-between">
        <Link className="font-headline-lg-mobile text-primary flex items-center gap-2 font-bold" href="/">
          <span className="material-symbols-outlined fill-icon text-[28px]">storefront</span>
          CoHoShop
        </Link>
        <Nav />
      </div>
    </header>
  );
}

import React from 'react';
import Link from 'next/link';

export default function NavLink({ href, children }) {
  return (
    <Link 
      href={href}
      className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors font-medium"
    >
      {children}
    </Link>
  );
}

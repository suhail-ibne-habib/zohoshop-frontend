import React from 'react';
import NavLink from './NavLink';

export default function NavList() {
  const links = [
    { href: '/', label: 'Home' },
    { href: '/explore', label: 'Explore' },
    { href: '/about', label: 'About Us' },
  ];

  return (
    <ul className="flex items-center gap-6 m-0 p-0 list-none">
      {links.map((link) => (
        <li key={link.href}>
          <NavLink href={link.href}>{link.label}</NavLink>
        </li>
      ))}
    </ul>
  );
}

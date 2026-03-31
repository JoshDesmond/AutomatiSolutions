import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavigationItem {
  name: string;
  href: string;
  isExternal?: boolean;
}

const servicesLinks: { name: string; href: string }[] = [
  { name: 'Digital Presence', href: '/services/digital-presence' },
];

const productsLinks: { name: string; href: string }[] = [
  { name: 'PhreePet', href: '/products/phreepet' },
];

const navigationItems: NavigationItem[] = [
  {
    name: 'Process',
    href: '#process',
  },
  {
    name: 'Contact',
    href: '#contact',
  },
];

const ChevronDownIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const HamburgerIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Common link styles to avoid repetition
const linkStyles = {
  base: 'text-gray-600 hover:text-indigo-600 transition-colors',
  mobile: 'block px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors',
  dropdownTrigger:
    'inline-flex items-center gap-1 text-gray-600 hover:text-indigo-600 transition-colors',
  dropdownItem:
    'block w-full px-4 py-2 text-left text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600',
} as const;

export const Header: React.FC = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileServicesOpen(false);
    setMobileProductsOpen(false);
  };

  const renderNavigationLink = (item: NavigationItem) => {
    if (item.href.startsWith('#')) {
      return (
        <a href={item.href} className={linkStyles.base}>
          {item.name}
        </a>
      );
    }
    return (
      <Link to={item.href} className={linkStyles.base}>
        {item.name}
      </Link>
    );
  };

  const renderMobileNavigationLink = (item: NavigationItem) => {
    if (item.href.startsWith('#')) {
      return (
        <a href={item.href} className={linkStyles.mobile} onClick={closeMobileMenu}>
          {item.name}
        </a>
      );
    }
    return (
      <Link to={item.href} className={linkStyles.mobile} onClick={closeMobileMenu}>
        {item.name}
      </Link>
    );
  };

  return (
    <header className="bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold text-gray-900 hover:text-indigo-600 transition-colors"
        >
          Automati Solutions
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block" aria-label="Main">
          <ul className="flex items-center space-x-8">
            <li className="relative group">
              <button
                type="button"
                className={linkStyles.dropdownTrigger}
                aria-haspopup="true"
                aria-expanded="false"
              >
                Services
                {ChevronDownIcon}
              </button>
              <ul
                role="menu"
                className="absolute left-0 top-full z-50 mt-1 hidden min-w-[12rem] rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 group-hover:block group-focus-within:block"
              >
                {servicesLinks.map((link) => (
                  <li key={link.href} role="none">
                    <Link role="menuitem" to={link.href} className={linkStyles.dropdownItem}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li className="relative group">
              <button
                type="button"
                className={linkStyles.dropdownTrigger}
                aria-haspopup="true"
                aria-expanded="false"
              >
                Products
                {ChevronDownIcon}
              </button>
              <ul
                role="menu"
                className="absolute left-0 top-full z-50 mt-1 hidden min-w-[12rem] rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 group-hover:block group-focus-within:block"
              >
                {productsLinks.map((link) => (
                  <li key={link.href} role="none">
                    <Link role="menuitem" to={link.href} className={linkStyles.dropdownItem}>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {isHome &&
              navigationItems.map((item) => (
                <li key={item.href}>{renderNavigationLink(item)}</li>
              ))}
          </ul>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 p-2 hover:bg-gray-100 rounded-md transition-colors"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? CloseIcon : HamburgerIcon}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50"
          role="navigation"
          aria-label="Mobile menu"
        >
          <nav className="px-4 py-2">
            <ul className="space-y-1">
              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors"
                  onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                  aria-expanded={mobileServicesOpen}
                >
                  Services
                  <span className={mobileServicesOpen ? 'rotate-180' : ''} aria-hidden>
                    {ChevronDownIcon}
                  </span>
                </button>
                {mobileServicesOpen && (
                  <ul className="mt-1 space-y-1 border-l-2 border-indigo-100 pl-4 ml-4">
                    {servicesLinks.map((link) => (
                      <li key={link.href}>
                        <Link to={link.href} className={linkStyles.mobile} onClick={closeMobileMenu}>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              <li>
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-2 text-left text-gray-600 hover:bg-gray-50 hover:text-indigo-600 rounded-md transition-colors"
                  onClick={() => setMobileProductsOpen(!mobileProductsOpen)}
                  aria-expanded={mobileProductsOpen}
                >
                  Products
                  <span className={mobileProductsOpen ? 'rotate-180' : ''} aria-hidden>
                    {ChevronDownIcon}
                  </span>
                </button>
                {mobileProductsOpen && (
                  <ul className="mt-1 space-y-1 border-l-2 border-indigo-100 pl-4 ml-4">
                    {productsLinks.map((link) => (
                      <li key={link.href}>
                        <Link to={link.href} className={linkStyles.mobile} onClick={closeMobileMenu}>
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              {isHome &&
                navigationItems.map((item) => (
                  <li key={item.href}>{renderMobileNavigationLink(item)}</li>
                ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

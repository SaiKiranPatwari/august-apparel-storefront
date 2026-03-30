"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import CartSlideOver from "../cart/CartSlideOver";
import { useCart } from "@/lib/CartContext";
import { SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { cartCount, setIsCartOpen } = useCart();
  const { isSignedIn } = useUser();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      router.push(`/collections/all?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Mock categories
  const categories = [
    { name: "New!", href: "/collections/clothing" },
    { name: "Dresses", href: "/collections/dresses" },
    { name: "Clothing", href: "/collections/clothing" },
    { name: "Shoes & Accessories", href: "/collections/shoes" },
    { name: "Sale", href: "/collections/sale" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-brand-offwhite border-b border-brand-sand">
      {/* Top Banner */}
      <div className="bg-brand-charcoal text-white text-xs text-center py-2 px-4">
        <p>Free shipping on orders over $150. <Link href="/collections/all" className="underline font-semibold">Shop Now</Link></p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Mobile menu button */}
          <div className="flex items-center lg:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 -ml-2 text-brand-charcoal"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center lg:justify-start flex-1 lg:flex-none">
            <Link href="/" className="font-serif text-3xl tracking-wide font-bold uppercase">
              Aura
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex lg:space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-brand-charcoal hover:text-brand-rust px-3 py-2 text-sm font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-brand-charcoal hover:text-brand-rust transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
            
            {/* Auth State Handling via Hook to avoid SSR Client Wrapper conflicts */}
            {!isSignedIn && (
              <SignInButton mode="modal">
                <button className="text-brand-charcoal hover:text-brand-rust transition-colors mt-[3px]">
                  <User className="h-5 w-5" />
                </button>
              </SignInButton>
            )}
            
            {isSignedIn && (
              <div className="mt-1">
                <UserButton userProfileMode="navigation" userProfileUrl="/account" />
              </div>
            )}
            <button 
              className="text-brand-charcoal hover:text-brand-rust transition-colors relative"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-rust text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Search Bar Dropdown */}
      {isSearchOpen && (
        <div className="absolute w-full bg-white border-b border-brand-sand shadow-sm z-40 p-4">
          <form onSubmit={handleSearch} className="max-w-3xl mx-auto relative flex items-center">
            <Search className="absolute left-3 w-5 h-5 text-brand-charcoal/50" />
            <input 
              type="text"
              autoFocus
              className="w-full pl-10 pr-10 py-3 border border-brand-sand focus:outline-none focus:border-brand-charcoal text-brand-charcoal text-sm"
              placeholder="Search products, brands, or styles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" onClick={() => setIsSearchOpen(false)} className="absolute right-3 p-1 text-brand-charcoal/50 hover:text-brand-charcoal">
              <X className="w-5 h-5" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-brand-offwhite border-t border-brand-sand absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-4 text-base font-medium text-brand-charcoal border-b border-brand-sand last:border-0"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Cart Slide-over */}
      <CartSlideOver />
    </header>
  );
}

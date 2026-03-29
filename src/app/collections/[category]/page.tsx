"use client";

import { useEffect, useState } from "react";
import ProductCard from "@/components/product/ProductCard";
import { ChevronDown, SlidersHorizontal, X, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Product } from "@/lib/mockProducts";

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryName = params.category.replace("-", " ");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  
  const searchParams = useSearchParams();
  const q = searchParams.get('q');
  
  const brands = ["Endless Rose", "English Factory", "Grey Lab", "Free the Roses"];

  useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (params.category !== "all") {
          queryParams.append("category", params.category);
        }
        if (selectedBrands.length > 0) {
          queryParams.append("brands", selectedBrands.join(","));
        }
        if (q) {
          queryParams.append("q", q);
        }
        
        const response = await fetch(`/api/products?${queryParams.toString()}`);
        if (!response.ok) throw new Error("Failed to fetch products");
        
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts();
  }, [params.category, selectedBrands, q]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const FilterSidebar = () => (
    <div className="space-y-8">
      {/* Category Filter */}
      <div>
        <h3 className="font-serif text-lg mb-4 flex justify-between items-center cursor-pointer">
          Category <ChevronDown className="w-4 h-4" />
        </h3>
        <ul className="space-y-3 text-sm text-brand-charcoal">
          <li><Link href="/collections/all" className="hover:underline">All Clothing</Link></li>
          <li><Link href="/collections/dresses" className="hover:underline">Dresses</Link></li>
          <li><Link href="/collections/tops" className="hover:underline">Tops</Link></li>
          <li><Link href="/collections/bottoms" className="hover:underline">Bottoms</Link></li>
          <li><Link href="/collections/accessories" className="hover:underline">Accessories</Link></li>
        </ul>
      </div>

      {/* Brand Filter */}
      <div className="border-t border-brand-sand pt-6">
        <h3 className="font-serif text-lg mb-4 flex justify-between items-center cursor-pointer">
          Brand <ChevronDown className="w-4 h-4" />
        </h3>
        <ul className="space-y-3 text-sm text-brand-charcoal">
          {brands.map(brand => (
            <li key={brand} className="flex items-center">
              <input 
                type="checkbox" 
                id={`brand-${brand}`} 
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="mr-2 cursor-pointer accent-brand-charcoal w-4 h-4"
              />
              <label htmlFor={`brand-${brand}`} className="cursor-pointer select-none">
                {brand}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* Size Filter */}
      <div className="border-t border-brand-sand pt-6">
        <h3 className="font-serif text-lg mb-4 flex justify-between items-center cursor-pointer">
          Size <ChevronDown className="w-4 h-4" />
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {['XXS', 'XS', 'S', 'M', 'L', 'XL'].map((size) => (
            <button key={size} className="border border-brand-sand py-2 text-xs hover:border-brand-charcoal transition-colors">
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Color Filter */}
      <div className="border-t border-brand-sand pt-6">
        <h3 className="font-serif text-lg mb-4 flex justify-between items-center cursor-pointer">
          Color <ChevronDown className="w-4 h-4" />
        </h3>
        <div className="flex flex-wrap gap-3">
          {['#000000', '#ffffff', '#F5F1EB', '#A8B4A5', '#B55A44', '#1E3A8A', '#991B1B'].map((color, i) => (
            <button 
              key={i} 
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
              title="Color option"
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumbs */}
      <nav className="flex text-xs text-brand-charcoal/60 mb-8 tracking-wider uppercase">
        <Link href="/" className="hover:text-brand-charcoal">Home</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-brand-charcoal capitalize">{categoryName}</span>
      </nav>

      <div className="flex justify-between items-end mb-8 border-b border-brand-sand pb-6">
        <div>
          <h1 className="text-4xl font-serif text-brand-charcoal capitalize whitespace-nowrap">
            {categoryName}
          </h1>
          {q && (
            <p className="text-brand-charcoal mt-2 italic">Search Results for &quot;{q}&quot;</p>
          )}
        </div>
        <p className="text-sm text-brand-charcoal/70">{!isLoading && `${products.length} items`}</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden flex justify-between border-b border-brand-sand pb-4">
          <button 
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex items-center text-sm font-semibold uppercase tracking-wider text-brand-charcoal"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            Filter & Sort
          </button>
        </div>

        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-28">
            <FilterSidebar />
          </div>
        </aside>

        {/* Mobile Filter Drawer */}
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-[100] flex lg:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setIsMobileFilterOpen(false)} />
            <div className="relative w-4/5 max-w-sm bg-brand-offwhite h-full shadow-2xl overflow-y-auto flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-brand-sand bg-white sticky top-0 z-10">
                <h2 className="text-xl font-serif text-brand-charcoal">Filters</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 -mr-2">
                  <X className="w-6 h-6 text-brand-charcoal" />
                </button>
              </div>
              <div className="p-6 flex-1">
                <FilterSidebar />
              </div>
              <div className="p-6 border-t border-brand-sand bg-white sticky bottom-0">
                <button 
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="w-full bg-brand-charcoal text-white py-4 uppercase text-sm font-semibold tracking-wider hover:bg-brand-rust transition-colors"
                >
                  View Results
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid */}
        <div className="flex-1 min-h-[50vh]">
          {isLoading ? (
            <div className="flex justify-center items-center h-full text-brand-charcoal py-24">
              <Loader2 className="w-8 h-8 animate-spin" />
              <span className="ml-3 text-sm uppercase tracking-wider">Loading products...</span>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24">
              <h2 className="text-2xl font-serif text-brand-charcoal">No products found.</h2>
              <p className="text-brand-charcoal/70 mt-2">Try adjusting your filters or search criteria.</p>
              <button 
                onClick={() => setSelectedBrands([])}
                className="inline-block mt-8 border border-brand-charcoal text-brand-charcoal px-8 py-3 uppercase tracking-wider text-xs font-semibold hover:bg-brand-charcoal hover:text-white transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

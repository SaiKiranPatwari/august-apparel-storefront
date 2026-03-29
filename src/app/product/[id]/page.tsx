"use client";

import { useState } from "react";
import Image from "next/image";
import { mockProducts } from "@/lib/mockProducts";
import { notFound } from "next/navigation";
import { useCart } from "@/lib/CartContext";

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = mockProducts.find(p => p.id === params.id);
  const { addItem } = useCart();
  
  if (!product) {
    notFound();
  }

  const [activeImage, setActiveImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);
  
  const handleAddToCart = () => {
    addItem({
      product,
      quantity,
      selectedColor,
      selectedSize,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col md:flex-row gap-12 lg:gap-20">
      
      {/* Left: Image Gallery */}
      <div className="w-full md:w-1/2 flex flex-col gap-4">
        {/* Main Image */}
        <div className="relative aspect-[3/4] w-full bg-brand-sand overflow-hidden">
          <Image 
            src={product.images[activeImage]} 
            alt={product.name}
            fill 
            className="object-cover"
            priority
          />
        </div>
        
        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-4">
          {product.images.map((img, index) => (
            <button 
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative aspect-[3/4] overflow-hidden ${activeImage === index ? "ring-2 ring-brand-charcoal" : "opacity-70 hover:opacity-100 transition-opacity"}`}
            >
              <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="w-full md:w-1/2 flex flex-col pt-4">
        <h1 className="text-3xl md:text-4xl font-serif text-brand-charcoal mb-4">{product.name}</h1>
        <p className="text-2xl text-brand-charcoal mb-8">${product.price.toFixed(2)}</p>
        
        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm uppercase tracking-wider font-semibold mb-3">Color</h3>
            <div className="flex gap-3">
              {product.colors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-brand-charcoal' : 'border-transparent ring-1 ring-gray-300'}`}
                  style={{ backgroundColor: color }}
                  aria-label={`Select color ${color}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* Sizes */}
        {product.sizes && product.sizes.length > 0 && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm uppercase tracking-wider font-semibold">Size</h3>
              <button className="text-xs text-brand-charcoal/70 underline">Size Guide</button>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-3 text-sm font-medium border transition-colors ${
                    selectedSize === size 
                      ? 'border-brand-charcoal bg-brand-charcoal text-white' 
                      : 'border-brand-sand text-brand-charcoal hover:border-brand-charcoal'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-4 mb-10">
          <div className="flex gap-4">
            <div className="flex border border-brand-charcoal px-4 items-center w-32 justify-between">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="text-xl px-2 py-2">−</button>
              <span className="font-semibold">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="text-xl px-2 py-2">+</button>
            </div>
            <button 
              onClick={handleAddToCart}
              className="flex-1 bg-brand-charcoal text-white py-4 uppercase font-semibold tracking-wider text-sm hover:bg-brand-rust transition-colors duration-300"
            >
              Add to Bag
            </button>
          </div>
        </div>

        {/* Product Details Accomodion (Mock) */}
        <div className="border-t border-b border-brand-sand py-6 my-6">
          <h3 className="font-serif text-lg mb-2">Product Details</h3>
          <p className="text-sm text-brand-charcoal/80 leading-relaxed mb-4">
            Meticulously crafted with a blend of natural fibers, this piece offers effortless style and supreme comfort. The intricate details evoke a classic vintage feel while remaining perfectly modern.
          </p>
          <ul className="list-disc list-inside text-sm text-brand-charcoal/80 space-y-1">
            <li>Ethically sourced materials</li>
            <li>Hand wash cold, line dry</li>
            <li>Imported</li>
            <li>Style No. {product.id.toUpperCase()}2025</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useCart } from "@/lib/CartContext";
import { X, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CartSlideOver() {
  const { isCartOpen, setIsCartOpen, items, removeItem, cartTotal, cartCount, updateQuantity } = useCart();
  const isEmpty = items.length === 0;

  if (!isCartOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-brand-charcoal/50 z-[60] transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 z-[70] w-full sm:max-w-md bg-brand-offwhite shadow-xl transform transition-transform duration-300 ease-in-out flex flex-col">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-sand bg-white">
          <h2 className="text-xl font-serif text-brand-charcoal flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Your Bag ({cartCount})
          </h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            className="text-brand-charcoal hover:text-brand-rust transition-colors p-2 -mr-2"
          >
            <X className="w-6 h-6" />
            <span className="sr-only">Close panel</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col space-y-6">
          {isEmpty ? (
            <div className="flex flex-col items-center max-w-xs mx-auto space-y-6 text-center mt-12">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm">
                <ShoppingBag className="w-10 h-10 text-brand-sand" />
              </div>
              <h3 className="text-2xl font-serif text-brand-charcoal">Your bag is empty.</h3>
              <p className="text-brand-charcoal/70 text-sm">
                Looks like you haven&apos;t added anything yet. Discover our latest arrivals and find something you love.
              </p>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-full bg-brand-charcoal text-white py-4 uppercase font-semibold text-sm tracking-wider hover:bg-brand-rust transition-colors duration-300 mt-4"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item, idx) => (
                <div key={idx} className="flex gap-4 border-b border-brand-sand pb-4 last:border-0">
                  <div className="relative w-24 h-32 bg-brand-sand flex-shrink-0">
                    <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <Link href={`/product/${item.product.id}`} onClick={() => setIsCartOpen(false)} className="font-serif text-brand-charcoal hover:text-brand-rust text-lg line-clamp-1">
                          {item.product.name}
                        </Link>
                        <p className="font-medium ml-2">${(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                      <div className="text-sm text-brand-charcoal/70 space-y-0.5">
                        {item.selectedColor && <p>Color: <span className="inline-block w-3 h-3 rounded-full border border-gray-300 align-middle ml-1" style={{backgroundColor: item.selectedColor}}></span></p>}
                        {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-end mt-2">
                      <div className="flex border border-brand-sand bg-white px-2">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedColor, item.selectedSize)} className="text-lg px-2 text-brand-charcoal hover:text-brand-rust">−</button>
                        <span className="w-6 text-center text-sm py-1">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedColor, item.selectedSize)} className="text-lg px-2 text-brand-charcoal hover:text-brand-rust">+</button>
                      </div>
                      <button 
                        onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                        className="text-brand-charcoal hover:text-brand-rust text-sm flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {!isEmpty && (
          <div className="border-t border-brand-sand px-6 py-6 bg-white space-y-4">
            <div className="flex justify-between text-base font-medium text-brand-charcoal">
              <p>Subtotal</p>
              <p>${cartTotal.toFixed(2)}</p>
            </div>
            <p className="text-sm text-brand-charcoal/70">Shipping and taxes calculated at checkout.</p>
            <button className="w-full bg-brand-charcoal text-white py-4 uppercase font-semibold text-sm tracking-wider hover:bg-brand-rust transition-colors duration-300">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

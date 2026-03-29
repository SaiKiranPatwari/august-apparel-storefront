"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCart } from "@/lib/CartContext";
import CheckoutForm from "@/components/checkout/CheckoutForm";
import Link from "next/link";

// Initialize Stripe Promise entirely outside of component render
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

export default function CheckoutPage() {
  const { cartTotal, items } = useCart();
  const [clientSecret, setClientSecret] = useState("");
  const [errorDesc, setErrorDesc] = useState("");

  useEffect(() => {
    // Only fetch payment intent if cart has monetary value
    if (cartTotal > 0) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: cartTotal }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Make sure your STRIPE_SECRET_KEY is valid in .env.local!");
          }
          return res.json();
        })
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            setErrorDesc(data.error || "Failed to retrieve secret");
          }
        })
        .catch((error) => {
          console.error("Payment intent error:", error);
          setErrorDesc(error.message);
        });
    }
  }, [cartTotal]);

  // Handle empty cart state directly
  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        <h1 className="text-3xl font-serif text-brand-charcoal mb-6">Your Cart is Empty</h1>
        <p className="text-brand-charcoal/70 mb-8">Please add items to your bag before heading to checkout.</p>
        <Link 
          href="/collections/all" 
          className="inline-block bg-brand-charcoal text-white px-8 py-4 uppercase font-semibold text-sm tracking-wider hover:bg-brand-rust transition-colors"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  // Stripe Element thematic design matched to the brand
  const appearance = {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#8C5642', // brand-rust
      colorBackground: '#ffffff',
      colorText: '#2D2D2D', // brand-charcoal
      colorDanger: '#dc2626',
      fontFamily: 'system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '2px',
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-4xl font-serif text-brand-charcoal mb-10 text-center border-b border-brand-sand pb-6">
        Secure Checkout
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        {/* Left column: Stripe Form */}
        <div className="md:col-span-7">
          {errorDesc ? (
            <div className="bg-red-50 text-red-600 p-6 border border-red-100">
              <h3 className="font-bold mb-2">Backend Connection Error:</h3>
              <p>{errorDesc}</p>
            </div>
          ) : clientSecret ? (
            <Elements options={{ clientSecret, appearance }} stripe={stripePromise}>
              <CheckoutForm amount={cartTotal} />
            </Elements>
          ) : (
            <div className="flex justify-center items-center py-32">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-rust"></div>
            </div>
          )}
        </div>

        {/* Right column: Order Summary */}
        <div className="md:col-span-5">
          <div className="bg-brand-offwhite p-6 md:p-8 border border-brand-sand sticky top-28">
            <h3 className="text-xl font-serif text-brand-charcoal mb-6 border-b border-brand-sand pb-4">Order Summary</h3>
            <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
              {items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-start text-sm">
                  <div className="flex-1 pr-4">
                    <p className="font-medium text-brand-charcoal line-clamp-1">{item.product.name}</p>
                    <p className="text-brand-charcoal/70">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="border-t border-brand-sand pt-4 space-y-3 text-sm">
              <div className="flex justify-between text-brand-charcoal/70">
                <p>Subtotal</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between text-brand-charcoal/70">
                <p>Shipping</p>
                <p>Free</p>
              </div>
              <div className="flex justify-between text-brand-charcoal/70">
                <p>Tax</p>
                <p>$0.00</p>
              </div>
              <div className="flex justify-between items-center text-lg font-bold text-brand-charcoal border-t border-brand-sand mt-4 pt-4">
                <p>Total</p>
                <p>${cartTotal.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

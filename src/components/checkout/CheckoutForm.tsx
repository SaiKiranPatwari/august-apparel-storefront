"use client";

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";
import { useCart } from "@/lib/CartContext";
import Link from "next/link";

export default function CheckoutForm({ amount }: { amount: number }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { clearCart } = useCart();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Technically Stripe wants a return_url for async payments,
        // but for simulated Card payments we can process immediately.
        return_url: window.location.origin + "/checkout?success=true",
      },
      redirect: "if_required", // Prevent redirecting so we can show our own success UI
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message ?? "An unexpected error occurred.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      setIsSuccess(true);
      if (clearCart) clearCart();
    }

    setIsLoading(false);
  };

  // If the payment just succeeded, show a beautiful success state
  if (isSuccess) {
    return (
      <div className="bg-brand-sage text-white p-8 md:p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-brand-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-3xl font-serif mb-4">Order Confirmed!</h2>
        <p className="mb-2 text-lg">Thank you for your purchase. We are preparing your items for shipment.</p>
        <p className="text-sm opacity-80 mb-8">(This was a simulated Stripe test transaction)</p>
        <Link 
          href="/collections/all"
          className="inline-block bg-white text-brand-charcoal px-8 py-3 uppercase tracking-wider font-semibold text-sm hover:bg-brand-sand transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  // The Stripe payment form
  return (
    <form id="payment-form" onSubmit={handleSubmit} className="bg-white p-6 md:p-10 shadow-sm border border-brand-sand">
      <div className="mb-8">
        <h3 className="text-xl font-serif text-brand-charcoal mb-6 border-b border-brand-sand pb-4">Payment Details</h3>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      </div>
      
      <button 
        disabled={isLoading || !stripe || !elements} 
        id="submit"
        className="mt-6 w-full bg-brand-charcoal text-white py-4 uppercase font-semibold tracking-wide hover:bg-brand-rust transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
      >
        <span id="button-text">
          {isLoading ? (
             <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </span>
      </button>

      {/* Stripe Error Messages */}
      {message && (
        <div id="payment-message" className="text-red-600 mt-6 text-sm font-medium p-4 bg-red-50 border border-red-100">
          {message}
        </div>
      )}
    </form>
  );
}

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/CartContext";
import { mockProducts } from "@/lib/mockProducts";

const DEFAULT_MOCK_ORDERS = [
  {
    id: "ORD-948271",
    date: "March 24, 2026",
    status: "Delivered",
    total: 288.0,
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[1], quantity: 1 }
    ]
  },
  {
    id: "ORD-892341",
    date: "February 12, 2026",
    status: "Shipped",
    total: 135.0,
    items: [
      { product: mockProducts[6], quantity: 1 }
    ]
  }
];

export default function OrderHistory() {
  const { addItem } = useCart();
  const [orders, setOrders] = useState(DEFAULT_MOCK_ORDERS);
  
  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"cancel" | "return" | null>(null);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const handleActionClick = (orderId: string, type: "cancel" | "return") => {
    setSelectedOrderId(orderId);
    setActionType(type);
    setModalOpen(true);
  };

  const confirmAction = () => {
    if (selectedOrderId && actionType) {
      setOrders(orders.map(o => {
        if (o.id === selectedOrderId) {
          return { ...o, status: actionType === "cancel" ? "Cancelled" : "Returned" };
        }
        return o;
      }));
    }
    setModalOpen(false);
    setSelectedOrderId(null);
    setActionType(null);
  };

  return (
    <div className="w-full relative">
      <div className="mb-6">
        <h2 className="text-2xl font-serif text-brand-charcoal">Order History</h2>
        <p className="text-brand-charcoal/60 text-sm mt-1">View, track, or manage your recent purchases.</p>
      </div>
      
      <div className="space-y-8">
        {orders.map((order) => (
          <div key={order.id} className="border border-brand-sand bg-white overflow-hidden shadow-sm">
            <div className="bg-brand-offwhite px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-brand-sand gap-4">
              <div className="flex gap-8">
                <div>
                  <p className="text-[11px] text-brand-charcoal/60 uppercase tracking-widest mb-1 font-semibold">Order Placed</p>
                  <p className="text-sm font-medium text-brand-charcoal">{order.date}</p>
                </div>
                <div>
                  <p className="text-[11px] text-brand-charcoal/60 uppercase tracking-widest mb-1 font-semibold">Total</p>
                  <p className="text-sm font-medium text-brand-charcoal">${order.total.toFixed(2)}</p>
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-[11px] text-brand-charcoal/60 uppercase tracking-widest mb-1 font-semibold">Order # {order.id}</p>
                <Link href="#" className="text-sm text-brand-rust hover:underline transition-colors block mt-1">
                  View Invoice &rarr;
                </Link>
              </div>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-brand-sand/50">
                <h3 className="font-serif text-lg text-brand-charcoal flex items-center gap-2">
                  Status: 
                  <span className={`px-3 py-1 text-xs uppercase tracking-wider font-bold rounded-full ${
                      order.status === 'Delivered' ? 'bg-brand-sage/10 text-brand-sage' : 
                      ['Cancelled', 'Returned'].includes(order.status) ? 'bg-black/5 text-brand-charcoal/60' : 
                      'bg-brand-rust/10 text-brand-rust'
                  }`}>
                    {order.status}
                  </span>
                </h3>
                <div className="flex items-center gap-6">
                  {order.status === 'Shipped' && (
                    <button 
                      onClick={() => handleActionClick(order.id, "cancel")}
                      className="text-sm font-medium text-brand-rust hover:text-red-700 transition-colors"
                    >
                      Cancel Order
                    </button>
                  )}
                  {order.status === 'Delivered' && (
                    <button 
                      onClick={() => handleActionClick(order.id, "return")}
                      className="text-sm font-medium text-brand-rust hover:text-red-700 transition-colors"
                    >
                      Return Order
                    </button>
                  )}
                  {['Delivered', 'Shipped'].includes(order.status) && (
                    <button className="text-sm font-medium text-brand-charcoal underline hover:text-brand-rust transition-colors">
                      Track Package
                    </button>
                  )}
                </div>
              </div>
              <div className="space-y-6">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="relative w-24 h-32 flex-shrink-0 bg-brand-offwhite border border-brand-sand">
                      <Image 
                        src={item.product.images[0]} 
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 flex flex-col justify-center">
                      <h4 className="font-medium text-brand-charcoal text-lg mb-1">{item.product.name}</h4>
                      <p className="text-brand-charcoal/70 text-sm mb-2 uppercase tracking-wide text-xs">{item.product.brand}</p>
                      <p className="text-brand-charcoal font-medium text-sm mt-auto">
                        ${item.product.price.toFixed(2)} <span className="text-brand-charcoal/60 font-normal ml-3">Qty: {item.quantity}</span>
                      </p>
                    </div>
                    <div className="hidden sm:flex flex-col justify-center gap-3 border-l border-brand-sand/50 pl-6 ml-2">
                       <button 
                         onClick={() => addItem({ product: item.product, quantity: 1, selectedColor: item.product.colors?.[0], selectedSize: item.product.sizes?.[0] })}
                         className="w-full px-6 py-2.5 text-xs uppercase tracking-wider font-semibold border border-brand-charcoal text-brand-charcoal hover:bg-brand-charcoal hover:text-white transition-all"
                       >
                         Buy it again
                       </button>
                       {!['Cancelled', 'Returned'].includes(order.status) && (
                         <button className="w-full px-6 py-2.5 text-xs uppercase tracking-wider font-semibold bg-brand-offwhite border border-brand-sand text-brand-charcoal hover:bg-brand-sand transition-all">
                           Leave Review
                         </button>
                       )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && actionType && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-brand-charcoal/60 backdrop-blur-sm">
          <div className="bg-white max-w-md w-full p-8 border border-brand-sand shadow-xl">
            <h3 className="text-2xl font-serif text-brand-charcoal mb-4">
              {actionType === "cancel" ? "Cancel Order" : "Return Order"}
            </h3>
            <p className="text-brand-charcoal/80 mb-8 leading-relaxed">
              Are you sure you want to {actionType === "cancel" ? "cancel" : "return"} this order? 
              You will be fully refunded to your original payment method.
            </p>
            <div className="flex justify-end gap-3.5 flex-col sm:flex-row">
              <button 
                onClick={() => setModalOpen(false)}
                className="px-6 py-2.5 text-sm uppercase tracking-wider font-semibold border border-brand-sand text-brand-charcoal hover:bg-brand-offwhite transition-colors"
              >
                Go Back
              </button>
              <button 
                onClick={confirmAction}
                className="px-6 py-2.5 text-sm uppercase tracking-wider font-semibold bg-brand-charcoal text-white hover:bg-brand-rust transition-colors"
              >
                Confirm {actionType === "cancel" ? "Cancellation" : "Return"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

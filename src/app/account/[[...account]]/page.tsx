"use client";

import { UserProfile } from "@clerk/nextjs";
import { Package } from "lucide-react";
import OrderHistory from "@/components/account/OrderHistory";

export default function AccountPage() {
  return (
    <div className="flex justify-center py-24 min-h-[70vh] px-4 md:px-8 bg-brand-offwhite/50">
      <UserProfile path="/account" routing="path">
        <UserProfile.Page
          label="Order History"
          labelIcon={<Package className="w-4 h-4" />}
          url="orders"
        >
          <OrderHistory />
        </UserProfile.Page>
      </UserProfile>
    </div>
  );
}

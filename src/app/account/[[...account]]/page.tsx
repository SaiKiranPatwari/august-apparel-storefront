import { UserProfile } from "@clerk/nextjs";

export default function AccountPage() {
  return (
    <div className="flex justify-center items-center py-24 min-h-[70vh]">
      <UserProfile path="/account" routing="path" />
    </div>
  );
}

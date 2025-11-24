"use client";

import { useLogout } from "@/lib/hooks/queries/useAuth";
import { useAuthStore } from "@/lib/store/authStore";
import { LogOut, User } from "lucide-react";

export default function Navbar() {
  const { username } = useAuthStore();
  const logout = useLogout();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16"></div>
      </div>
    </nav>
  );
}

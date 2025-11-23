'use client';

import { useLogout } from '@/lib/hooks/queries/useAuth';
import { useAuthStore } from '@/lib/store/authStore';
import { LogOut, User } from 'lucide-react';

export default function Navbar() {
  const { username } = useAuthStore();
  const logout = useLogout();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Pokemon App</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {username && (
              <div className="flex items-center gap-2 text-gray-700">
                <User className="h-5 w-5" />
                <span className="text-sm font-medium">{username}</span>
              </div>
            )}
            <button
              onClick={logout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}


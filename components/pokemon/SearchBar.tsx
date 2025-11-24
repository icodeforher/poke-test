'use client';

import Image from 'next/image';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChange, 
  placeholder = 'Search' 
}: SearchBarProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Image 
          src="/images/search.svg" 
          alt="Search" 
          width={20} 
          height={20}
          className="opacity-50"
        />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="block w-full pl-12 pr-4 py-3 bg-white rounded-full shadow-inner-2 text-body-3 placeholder-gray-medium focus:outline-none focus:ring-2 focus:ring-white"
      />
    </div>
  );
}


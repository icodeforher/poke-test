'use client';

import { SortOption } from '@/types/pokemon';
import { ArrowUpDown } from 'lucide-react';

interface SortControlsProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortControls({ value, onChange }: SortControlsProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-5 w-5 text-gray-500" />
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SortOption)}
        className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md bg-white"
      >
        <option value="number-asc">Number (Low to High)</option>
        <option value="number-desc">Number (High to Low)</option>
        <option value="name-asc">Name (A to Z)</option>
        <option value="name-desc">Name (Z to A)</option>
      </select>
    </div>
  );
}


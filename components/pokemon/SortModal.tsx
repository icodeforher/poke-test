'use client';

import { SortOption } from '@/types/pokemon';

interface SortModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export default function SortModal({ isOpen, onClose, currentSort, onSortChange }: SortModalProps) {
  if (!isOpen) return null;

  const handleSortChange = (sort: SortOption) => {
    onSortChange(sort);
    onClose();
  };

  const isNumberSelected = currentSort === 'number-asc' || currentSort === 'number-desc';
  const isNameSelected = currentSort === 'name-asc' || currentSort === 'name-desc';

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      
      <div className="relative bg-pokemon-red rounded-2xl shadow-drop-6 w-72 mx-4">
        <div className="px-6 py-4">
          <h3 className="text-subtitle-1 text-white font-bold text-center">Sort by:</h3>
        </div>
        
        <div className="bg-white rounded-2xl m-2 p-4 space-y-4">
          <button
            onClick={() => handleSortChange('number-asc')}
            className="w-full flex items-center gap-3 text-left"
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              isNumberSelected 
                ? 'border-pokemon-red bg-pokemon-red' 
                : 'border-gray-medium bg-white'
            }`}>
              {isNumberSelected && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className="text-body-3 text-gray-dark font-normal">Number</span>
          </button>
          
          <button
            onClick={() => handleSortChange('name-asc')}
            className="w-full flex items-center gap-3 text-left"
          >
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
              isNameSelected 
                ? 'border-pokemon-red bg-pokemon-red' 
                : 'border-gray-medium bg-white'
            }`}>
              {isNameSelected && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
            <span className="text-body-3 text-gray-dark font-normal">Name</span>
          </button>
        </div>
      </div>
    </div>
  );
}


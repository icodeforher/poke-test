'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { usePokemonList } from '@/lib/hooks/queries/usePokemon';
import { PokemonListItem, SortOption } from '@/types/pokemon';
import { storage } from '@/lib/utils/storage';
import { sortPokemonList, filterPokemonList } from '@/lib/utils/pokemon';
import Navbar from '@/components/layout/Navbar';
import SearchBar from '@/components/pokemon/SearchBar';
import SortControls from '@/components/pokemon/SortControls';
import PokemonGrid from '@/components/pokemon/PokemonGrid';
import LoadingSkeleton from '@/components/pokemon/LoadingSkeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function PokemonListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('number-asc');
  const [offset, setOffset] = useState(0);
  const limit = 20;

  // Check authentication
  useEffect(() => {
    const token = storage.getToken();
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Fetch pokemons with React Query
  const { data, isLoading, error } = usePokemonList(offset, limit);

  const pokemons = data?.results || [];
  const totalCount = data?.count || 0;

  // Filter and sort pokemons
  const displayedPokemons = useMemo(() => {
    let filtered = filterPokemonList(pokemons, searchQuery);
    let sorted = sortPokemonList(filtered, sortBy);
    return sorted;
  }, [pokemons, searchQuery, sortBy]);

  // Pagination handlers
  const handlePrevious = () => {
    if (offset > 0) {
      setOffset(offset - limit);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (offset + limit < totalCount) {
      setOffset(offset + limit);
      window.scrollTo(0, 0);
    }
  };

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Pokemon</h1>
          <p className="text-gray-600">Browse through {totalCount} amazing Pokemon</p>
        </div>

        {/* Search and Sort Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name or number..."
            />
          </div>
          <div className="sm:w-64">
            <SortControls value={sortBy} onChange={setSortBy} />
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-red-800">{error.message}</p>
          </div>
        )}

        {/* Pokemon Grid */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <PokemonGrid pokemons={displayedPokemons} />
        )}

        {/* Pagination */}
        {!isLoading && !searchQuery && (
          <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
            <button
              onClick={handlePrevious}
              disabled={offset === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
              Previous
            </button>

            <div className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of{' '}
              <span className="font-medium">{totalPages}</span>
            </div>

            <button
              onClick={handleNext}
              disabled={offset + limit >= totalCount}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </main>
    </div>
  );
}


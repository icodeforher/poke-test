"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { usePokemonList } from "@/lib/hooks/queries/usePokemon";
import { SortOption } from "@/types/pokemon";
import { storage } from "@/lib/utils/storage";
import { sortPokemonList, filterPokemonList } from "@/lib/utils/pokemon";
import Header from "@/components/layout/Header";
import PokemonGrid from "@/components/pokemon/PokemonGrid";
import LoadingSkeleton from "@/components/pokemon/LoadingSkeleton";
import SortModal from "@/components/pokemon/SortModal";

export default function PokemonListPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("number-asc");
  const [showSortModal, setShowSortModal] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20;

  useEffect(() => {
    const token = storage.getToken();
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const { data, isLoading, error } = usePokemonList(offset, limit);

  const pokemons = data?.results || [];
  const totalCount = data?.count || 0;

  const displayedPokemons = useMemo(() => {
    let filtered = filterPokemonList(pokemons, searchQuery);
    let sorted = sortPokemonList(filtered, sortBy);
    return sorted;
  }, [pokemons, searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-gray-background">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={true}
        showSortButton={true}
        onSortClick={() => setShowSortModal(!showSortModal)}
        isSortOpen={showSortModal}
        currentSort={sortBy}
      />
      
      <SortModal 
        isOpen={showSortModal}
        onClose={() => setShowSortModal(false)}
        currentSort={sortBy}
        onSortChange={setSortBy}
      />
      
      <main className="max-w-7xl mx-auto">
        {error && (
          <div className="mx-4 mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <p className="text-body-2 text-red-800">{error.message}</p>
          </div>
        )}

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="mt-6">
            <PokemonGrid pokemons={displayedPokemons} />
          </div>
        )}
      </main>
    </div>
  );
}

'use client';

import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api/client-typed';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';

/**
 * Hook to fetch paginated list of Pokemon
 */
export function usePokemonList(offset: number = 0, limit: number = 20) {
  return useQuery<PokemonListResponse>({
    queryKey: ['pokemons', offset, limit],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/pokemons', {
        params: {
          query: { offset, limit },
        },
      });

      if (error) {
        throw new Error('Failed to fetch Pokemon list');
      }

      return data as unknown as PokemonListResponse;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook to fetch Pokemon detail by ID or name
 */
export function usePokemonDetail(idOrName: string) {
  return useQuery<Pokemon>({
    queryKey: ['pokemon', idOrName],
    queryFn: async () => {
      const { data, error } = await apiClient.GET('/pokemons/{pokemon_id}', {
        params: {
          path: { pokemon_id: idOrName },
        },
      });

      if (error) {
        throw new Error(`Failed to fetch Pokemon: ${idOrName}`);
      }

      return data as unknown as Pokemon;
    },
    enabled: !!idOrName,
    staleTime: 10 * 60 * 1000, // 10 minutes (Pokemon details don't change often)
  });
}


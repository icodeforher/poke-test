import { apiClient } from './client';
import { Pokemon, PokemonListResponse } from '@/types/pokemon';

/**
 * Pokemon API endpoints
 */
export const pokemonApi = {
  /**
   * Get paginated list of pokemons
   */
  getPokemons: async (offset: number = 0, limit: number = 20): Promise<PokemonListResponse> => {
    const response = await apiClient.get<PokemonListResponse>('/pokemons', {
      params: { offset, limit },
    });
    return response.data;
  },

  /**
   * Get detailed information about a specific pokemon
   */
  getPokemonDetail: async (idOrName: string | number): Promise<Pokemon> => {
    const response = await apiClient.get<Pokemon>(`/pokemons/${idOrName}`);
    return response.data;
  },
};


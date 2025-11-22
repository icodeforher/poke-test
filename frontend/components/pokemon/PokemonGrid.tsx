'use client';

import { PokemonListItem } from '@/types/pokemon';
import PokemonCard from './PokemonCard';

interface PokemonGridProps {
  pokemons: PokemonListItem[];
}

export default function PokemonGrid({ pokemons }: PokemonGridProps) {
  if (pokemons.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No Pokemon found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} />
      ))}
    </div>
  );
}


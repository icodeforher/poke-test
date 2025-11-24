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
        <p className="text-body-1 text-gray-medium">No Pokemon found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 px-4 pb-4">
      {pokemons.map((pokemon) => (
        <div key={pokemon.name} className="w-full" style={{ aspectRatio: "104/108" }}>
          <PokemonCard pokemon={pokemon} />
        </div>
      ))}
    </div>
  );
}


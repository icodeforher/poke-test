'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PokemonListItem } from '@/types/pokemon';
import { getPokemonIdFromUrl, getPokemonSpriteUrl, formatPokemonName } from '@/lib/utils/pokemon';

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const id = getPokemonIdFromUrl(pokemon.url);
  const spriteUrl = getPokemonSpriteUrl(id);
  const formattedName = formatPokemonName(pokemon.name);

  return (
    <Link href={`/pokemon/${id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-4 cursor-pointer border border-gray-200 hover:border-blue-400">
        <div className="relative w-full h-40 mb-3">
          <Image
            src={spriteUrl}
            alt={formattedName}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500 font-semibold">#{id.toString().padStart(3, '0')}</p>
          <h3 className="text-lg font-bold text-gray-900 mt-1">{formattedName}</h3>
        </div>
      </div>
    </Link>
  );
}


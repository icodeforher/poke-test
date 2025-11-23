'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import { usePokemonDetail } from '@/lib/hooks/queries/usePokemon';
import { storage } from '@/lib/utils/storage';
import { formatPokemonName, getPokemonTypeColor } from '@/lib/utils/pokemon';
import Navbar from '@/components/layout/Navbar';
import { ArrowLeft, Weight, Ruler, Zap } from 'lucide-react';

export default function PokemonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  
  // Check authentication
  useEffect(() => {
    const token = storage.getToken();
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  // Fetch pokemon detail with React Query
  const { data: pokemon, isLoading, error } = usePokemonDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </main>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="max-w-5xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-800">{error?.message || 'Pokemon not found'}</p>
            <button
              onClick={() => router.push('/pokemon')}
              className="mt-4 text-blue-600 hover:underline"
            >
              Back to list
            </button>
          </div>
        </main>
      </div>
    );
  }

  const spriteUrl = pokemon.sprites.other?.['official-artwork']?.front_default || pokemon.sprites.front_default;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.push('/pokemon')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to list
        </button>

        {/* Pokemon Header */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Image */}
            <div className="flex items-center justify-center">
              <div className="relative w-full h-80">
                <Image
                  src={spriteUrl}
                  alt={pokemon.name}
                  fill
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>

            {/* Basic Info */}
            <div>
              <div className="mb-4">
                <p className="text-gray-500 text-lg font-semibold">#{pokemon.id.toString().padStart(3, '0')}</p>
                <h1 className="text-4xl font-bold text-gray-900 mt-2">{formatPokemonName(pokemon.name)}</h1>
              </div>

              {/* Types */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-2">Types</h3>
                <div className="flex gap-2">
                  {pokemon.types.map((type) => (
                    <span
                      key={type.slot}
                      className="px-4 py-1 rounded-full text-white text-sm font-medium"
                      style={{ backgroundColor: getPokemonTypeColor(type.type.name) }}
                    >
                      {formatPokemonName(type.type.name)}
                    </span>
                  ))}
                </div>
              </div>

              {/* Physical Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Weight className="h-4 w-4" />
                    <span className="text-xs font-medium">Weight</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{pokemon.weight / 10} kg</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Ruler className="h-4 w-4" />
                    <span className="text-xs font-medium">Height</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{pokemon.height / 10} m</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Zap className="h-4 w-4" />
                    <span className="text-xs font-medium">Base XP</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{pokemon.base_experience || 'N/A'}</p>
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">Base Stats</h3>
                <div className="space-y-2">
                  {pokemon.stats.map((stat) => (
                    <div key={stat.stat.name}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600 capitalize">{stat.stat.name.replace('-', ' ')}</span>
                        <span className="font-semibold text-gray-900">{stat.base_stat}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Abilities */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Abilities</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {pokemon.abilities.map((ability) => (
              <div
                key={ability.slot}
                className="bg-gray-50 rounded-lg p-4 border border-gray-200"
              >
                <p className="font-medium text-gray-900 capitalize">
                  {ability.ability.name.replace('-', ' ')}
                </p>
                {ability.is_hidden && (
                  <span className="text-xs text-blue-600 font-medium">Hidden Ability</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Moves */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Moves ({pokemon.moves.length})</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-96 overflow-y-auto">
            {pokemon.moves.slice(0, 50).map((move) => (
              <div
                key={move.move.name}
                className="bg-gray-50 rounded px-3 py-2 text-sm text-gray-700 capitalize border border-gray-200"
              >
                {move.move.name.replace('-', ' ')}
              </div>
            ))}
          </div>
          {pokemon.moves.length > 50 && (
            <p className="text-sm text-gray-500 mt-3">Showing first 50 moves</p>
          )}
        </div>

        {/* Forms */}
        {pokemon.forms.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Forms</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
              {pokemon.forms.map((form) => (
                <div
                  key={form.name}
                  className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                >
                  <p className="font-medium text-gray-900 capitalize">
                    {form.name.replace('-', ' ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


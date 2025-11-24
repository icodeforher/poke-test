"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { usePokemonDetail } from "@/lib/hooks/queries/usePokemon";
import { storage } from "@/lib/utils/storage";
import { formatPokemonName, getPokemonTypeColor } from "@/lib/utils/pokemon";
import { ArrowLeft } from "lucide-react";

export default function PokemonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  useEffect(() => {
    const token = storage.getToken();
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  const { data: pokemon, isLoading, error } = usePokemonDetail(id);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-background">
        <div className="animate-pulse">
          <div className="h-64 bg-gray-medium"></div>
          <div className="px-4 py-6 space-y-4">
            <div className="h-8 bg-gray-light rounded w-1/2"></div>
            <div className="h-32 bg-gray-light rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !pokemon) {
    return (
      <div className="min-h-screen bg-gray-background flex items-center justify-center p-4">
        <div className="bg-white rounded-lg p-6 max-w-md w-full">
          <p className="text-body-1 text-red-600 mb-4">
            {error?.message || "Pokemon not found"}
          </p>
          <button
            onClick={() => router.push("/pokemon")}
            className="w-full bg-pokemon-red text-white py-2 rounded-lg text-subtitle-2"
          >
            Back to list
          </button>
        </div>
      </div>
    );
  }

  const spriteUrl =
    pokemon?.sprites?.other?.["official-artwork"]?.front_default ||
    pokemon?.sprites.front_default;

  const primaryType = pokemon.types[0]?.type.name || 'normal';
  const typeColor = getPokemonTypeColor(primaryType);

  const statNameMap: { [key: string]: string } = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SATK',
    'special-defense': 'SDEF',
    'speed': 'SPD'
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: typeColor }}>
      <div className="absolute top-2 right-2 opacity-10 z-0">
        <Image 
          src="/images/pokeball.svg" 
          alt="Pokeball" 
          width={200} 
          height={200}
          className="invert"
        />
      </div>

      <div className="relative px-4 pt-4">
        <div className="max-w-md mx-auto relative z-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => router.push("/pokemon")}
                className="text-white"
              >
                <ArrowLeft className="w-8 h-8" />
              </button>
              <h1 className="text-headline text-white font-bold capitalize">
                {formatPokemonName(pokemon.name)}
              </h1>
            </div>
            <span className="text-subtitle-1 text-white font-bold">
              #{pokemon.id.toString().padStart(3, "0")}
            </span>
          </div>

          <div className="relative w-full flex justify-center mb-2">
            <Image
              src={spriteUrl}
              alt={pokemon.name}
              width={200}
              height={200}
              className="object-contain relative z-10"
              unoptimized
            />
          </div>
        </div>
      </div>

      <div className="flex-1 relative z-10">
        <div className="bg-white rounded-t-3xl shadow-drop-6 min-h-full">
          <div className="max-w-md mx-auto px-6 pt-12 pb-8">
            <div className="flex justify-center gap-2 mb-8">
            {pokemon.types.map((type) => (
              <span
                key={type.slot}
                className="px-4 py-1 rounded-full text-white text-subtitle-2 font-bold capitalize"
                style={{
                  backgroundColor: getPokemonTypeColor(type.type.name),
                }}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          <h2 className="text-subtitle-1 font-bold text-center mb-4" style={{ color: typeColor }}>
            About
          </h2>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <Image 
                src="/images/weight.svg" 
                alt="Weight" 
                width={16} 
                height={16} 
                className="mx-auto mb-2"
              />
              <p className="text-body-3 text-gray-dark mb-1">
                {pokemon.weight / 10} kg
              </p>
              <p className="text-caption text-gray-medium">Weight</p>
            </div>
            <div className="text-center border-x border-gray-light">
              <Image 
                src="/images/straighten.svg" 
                alt="Height" 
                width={16} 
                height={16} 
                className="mx-auto mb-2"
              />
              <p className="text-body-3 text-gray-dark mb-1">
                {pokemon.height / 10} m
              </p>
              <p className="text-caption text-gray-medium">Height</p>
            </div>
            <div className="text-center">
              <p className="text-body-3 text-gray-dark mb-1 capitalize">
                {pokemon.abilities.slice(0, 2).map(a => a.ability.name.replace('-', ' ')).join('\n')}
              </p>
              <p className="text-caption text-gray-medium">Moves</p>
            </div>
          </div>

          <p className="text-body-3 text-gray-dark text-center mb-8">
            There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.
          </p>

          <h2 className="text-subtitle-1 font-bold text-center mb-4" style={{ color: typeColor }}>
            Base Stats
          </h2>

          <div className="space-y-3">
            {pokemon.stats.map((stat) => (
              <div key={stat.stat.name} className="flex items-center gap-2">
                <span 
                  className="text-subtitle-3 font-bold w-12 text-right"
                  style={{ color: typeColor }}
                >
                  {statNameMap[stat.stat.name] || stat.stat.name.toUpperCase()}
                </span>
                <span className="text-body-3 text-gray-dark w-8 text-center">
                  {stat.base_stat.toString().padStart(3, '0')}
                </span>
                <div className="flex-1 h-1 bg-gray-light rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: typeColor,
                      width: `${Math.min((stat.base_stat / 255) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}

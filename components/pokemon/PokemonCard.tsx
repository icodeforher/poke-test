"use client";

import Image from "next/image";
import Link from "next/link";
import { PokemonListItem } from "@/types/pokemon";
import {
  getPokemonIdFromUrl,
  getPokemonSpriteUrl,
  formatPokemonName,
} from "@/lib/utils/pokemon";

interface PokemonCardProps {
  pokemon: PokemonListItem;
}

export default function PokemonCard({ pokemon }: PokemonCardProps) {
  const id = getPokemonIdFromUrl(pokemon.url);
  const spriteUrl = getPokemonSpriteUrl(id);
  const formattedName = formatPokemonName(pokemon.name);

  return (
    <Link href={`/pokemon/${id}`}>
      <div className="bg-white rounded-lg shadow-drop-2 hover:shadow-drop-6 transition-all duration-300 cursor-pointer w-full h-full relative">
        <div className="absolute top-0 right-0 px-2 pt-1 z-20">
          <span className="text-subtitle-3 text-gray-medium">
            #{id.toString().padStart(3, "0")}
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center px-2 pt-4 pb-8 z-10">
          <div className="relative w-full h-full">
            <Image
              src={spriteUrl}
              alt={formattedName}
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>

        <div
          className="absolute bottom-0 left-0 right-0 flex items-end justify-center z-5"
          style={{
            height: "70px",
            borderRadius: "7px",
            backgroundColor: "#EFEFEF",
            paddingBottom: "8px",
            paddingLeft: "8px",
            paddingRight: "8px",
          }}
        >
          <h3 className="text-body-3 text-gray-dark font-normal capitalize truncate w-full text-center">
            {formattedName}
          </h3>
        </div>
      </div>
    </Link>
  );
}

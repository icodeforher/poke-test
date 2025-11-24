"use client";

import Image from "next/image";
import SearchBar from "@/components/pokemon/SearchBar";
import { SortOption } from "@/types/pokemon";

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
  showSearch?: boolean;
  showSortButton?: boolean;
  onSortClick?: () => void;
  isSortOpen?: boolean;
  currentSort?: SortOption;
}

export default function Header({
  searchQuery = "",
  onSearchChange,
  showSearch = false,
  showSortButton = false,
  onSortClick,
  isSortOpen = false,
  currentSort = "number-asc",
}: HeaderProps) {
  const getSortIcon = () => {
    if (isSortOpen) return "/images/close.svg";
    if (currentSort === "name-asc" || currentSort === "name-desc") {
      return "/images/text_format.svg";
    }
    return "/images/tag.svg";
  };

  return (
    <header className="bg-pokemon-red px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Image
            src="/images/pokeball.svg"
            alt="Pokéball"
            width={48}
            height={48}
            className="invert"
          />
          <h1 className="text-headline text-white font-bold">Pokédex</h1>
        </div>

        {showSearch && onSearchChange && (
          <div className="flex gap-3">
            <div className="flex-1">
              <SearchBar
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Search"
              />
            </div>
            {showSortButton && (
              <button
                onClick={onSortClick}
                className="rounded-full w-12 h-12 flex items-center justify-center shadow-drop-2 hover:shadow-drop-6 transition-all bg-white"
              >
                <Image
                  src={getSortIcon()}
                  alt="Sort"
                  width={20}
                  height={20}
                  className={isSortOpen ? "opacity-70" : ""}
                />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

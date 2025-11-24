import { PokemonListItem, SortOption } from '@/types/pokemon';

/**
 * Extract Pokemon ID from URL
 */
export function getPokemonIdFromUrl(url: string): number {
  const parts = url.split('/').filter(Boolean);
  return parseInt(parts[parts.length - 1]);
}

/**
 * Get Pokemon sprite URL
 */
export function getPokemonSpriteUrl(id: number): string {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
}

/**
 * Format Pokemon name (capitalize first letter)
 */
export function formatPokemonName(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

/**
 * Sort Pokemon list
 */
export function sortPokemonList(
  pokemons: PokemonListItem[],
  sortBy: SortOption
): PokemonListItem[] {
  const sorted = [...pokemons];

  switch (sortBy) {
    case 'name-asc':
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    
    case 'name-desc':
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    
    case 'number-asc':
      return sorted.sort((a, b) => {
        const idA = getPokemonIdFromUrl(a.url);
        const idB = getPokemonIdFromUrl(b.url);
        return idA - idB;
      });
    
    case 'number-desc':
      return sorted.sort((a, b) => {
        const idA = getPokemonIdFromUrl(a.url);
        const idB = getPokemonIdFromUrl(b.url);
        return idB - idA;
      });
    
    default:
      return sorted;
  }
}

/**
 * Filter Pokemon list by search query
 */
export function filterPokemonList(
  pokemons: PokemonListItem[],
  query: string
): PokemonListItem[] {
  if (!query.trim()) return pokemons;

  const lowerQuery = query.toLowerCase();
  return pokemons.filter((pokemon) => {
    const id = getPokemonIdFromUrl(pokemon.url);
    return (
      pokemon.name.toLowerCase().includes(lowerQuery) ||
      id.toString().includes(lowerQuery)
    );
  });
}

/**
 * Get Pokemon type color
 */
export function getPokemonTypeColor(type: string): string {
  const colors: Record<string, string> = {
    normal: '#A8A878',
    fire: '#F08030',
    water: '#6890F0',
    electric: '#F8D030',
    grass: '#78C850',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#EE99AC',
  };

  return colors[type.toLowerCase()] || '#777';
}


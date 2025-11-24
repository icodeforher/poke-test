export interface PokemonListItem {
  name: string;
  url: string;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonSprites {
  front_default: string;
  front_shiny?: string;
  front_female?: string;
  back_default?: string;
  other?: {
    "official-artwork"?: {
      front_default: string;
    };
    dream_world?: {
      front_default: string;
    };
  };
}

export interface PokemonAbility {
  ability: {
    name: string;
    url: string;
  };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}

export interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface PokemonForm {
  name: string;
  url: string;
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  sprites: PokemonSprites;
  abilities: PokemonAbility[];
  types: PokemonType[];
  moves: PokemonMove[];
  stats: PokemonStat[];
  forms: PokemonForm[];
}

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "number-asc"
  | "number-desc";

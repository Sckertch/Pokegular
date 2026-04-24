import { PokemonType } from './pokemonType';

export interface Pokemon {
  _id: string;
  name: string;
  description: string;
  types: PokemonType[];
  image: string;
}

export interface PokemonPayload {
  name: string;
  description: string;
  image: string;
}

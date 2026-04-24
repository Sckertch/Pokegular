import { Type } from './type';

export interface Pokemon {
  _id: string;
  name: string;
  description: string;
  types: Type[];
  image: string;
}

export interface PokemonPayload {
  name: string;
  description: string;
  image: string;
}

import { AppPokemonItem } from './app-pokemon-item';

export interface User {
  username: string;
  wishList: AppPokemonItem[];
  personalList: AppPokemonItem[];
}

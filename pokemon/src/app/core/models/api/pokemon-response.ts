import { BaseItem } from '../base-item';

export interface PokemonResponse {
  count: number;
  next: string;
  previous: string;
  results: BaseItem[];
}

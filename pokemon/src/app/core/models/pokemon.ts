import { Ability } from './ability';
import { BaseItem } from './base-item';
import { GameIndice } from './game-indice';
import { Move } from './move';
import { Sprite } from './sprite';
import { Type } from './type';

export interface Pokemon {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: Ability[];
  forms: BaseItem[];
  game_indices: GameIndice[];
  held_items: unknown[];
  location_area_encounters: string;
  moves: Move[];
  species: BaseItem;
  sprites: Sprite;
  stats: BaseItem;
  types: Type[];
  hasFullInfo?: boolean;
}

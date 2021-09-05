import { Injectable } from '@angular/core';
import { SessionStorageService } from '@app/core';
import { BehaviorSubject } from 'rxjs';

import { AppPokemonItem, BaseItem, Pokemon } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PokemonsSuggestionsService {
  private _pokemons: BehaviorSubject<(Pokemon | BaseItem | AppPokemonItem)[]> =
    new BehaviorSubject<(Pokemon | BaseItem | AppPokemonItem)[]>([]);

  constructor(private sessionStorageService: SessionStorageService) {}

  initSuggestions(): void {
    const stored = this.sessionStorageService.suggestions;
    this._pokemons.next(stored.map((s) => ({ name: s })));
  }

  storeSuggestions(): void {
    this.sessionStorageService.suggestions = this._pokemons.value.map(
      (p) => p.name
    );
  }

  addOneToStore(
    pokemon: Pokemon | BaseItem | AppPokemonItem,
    hasFullInfo: boolean = false
  ): void {
    const currentValues = this._pokemons.value;
    if (!currentValues.find((p) => p.name === pokemon.name))
      this._pokemons.next([...currentValues, { ...pokemon, hasFullInfo }]);
  }

  addSeveralToStore(pokemons: (BaseItem | AppPokemonItem)[]): void {
    const currentValues = this._pokemons.value;
    const notInStore = pokemons.filter(
      (pokemon) => !currentValues.find((p) => p.name === pokemon.name)
    );
    this._pokemons.next([...currentValues, ...notInStore]);
  }

  getMatchingPokemonsInStore(
    text: string
  ): (Pokemon | BaseItem | AppPokemonItem)[] {
    const currentValues = this._pokemons.value;
    return currentValues.filter((pokemon) => pokemon.name.includes(text));
  }

  getExactMatchingPokemonInStore(text: string): Pokemon | undefined {
    const currentValues = this._pokemons.value;
    return currentValues.find(
      (pokemon) => pokemon.name === text && (pokemon as Pokemon).hasFullInfo
    ) as Pokemon;
  }
}

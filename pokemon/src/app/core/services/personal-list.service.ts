import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppPokemonItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class PersonalListService {
  private _myPokemons$: BehaviorSubject<AppPokemonItem[]> = new BehaviorSubject<
    AppPokemonItem[]
  >([]);

  get myPokemons$(): Observable<AppPokemonItem[]> {
    return this._myPokemons$.asObservable();
  }

  setMyList(pokemons: AppPokemonItem[]): void {
    this._myPokemons$.next(pokemons);
  }

  addMyPokemon(pokemon: AppPokemonItem): void {
    const currentValues = this._myPokemons$.value;
    const matchingPokemonIndex = currentValues.findIndex(
      (p) => p.name === pokemon.name
    );
    if (matchingPokemonIndex > -1) {
      const pokeCount = currentValues[matchingPokemonIndex];
      currentValues[matchingPokemonIndex] = {
        ...pokeCount,
        count: pokeCount.count ? ++pokeCount.count : 1,
      };
      this._myPokemons$.next([...currentValues]);
    } else {
      this.createMyPokemon(pokemon);
    }
  }

  createMyPokemon(pokemon: AppPokemonItem): void {
    const currentValues = this._myPokemons$.value;
    const matchingPokemon = currentValues.find((p) => p.name === pokemon.name);
    if (matchingPokemon) {
      this.addMyPokemon(pokemon);
      return;
    }
    this._myPokemons$.next([...currentValues, { ...pokemon, count: 1 }]);
  }

  removeMyPokemon(pokemon: AppPokemonItem): void {
    const currentValues = this._myPokemons$.value;
    const matchingPokemonIndex = currentValues.findIndex(
      (p) => p.name === pokemon.name
    );
    if (matchingPokemonIndex > -1) {
      const pokeCount = currentValues[matchingPokemonIndex];
      if (!pokeCount.count || pokeCount.count < 2) {
        this.deleteMyPokemon(pokemon);
      } else {
        currentValues[matchingPokemonIndex] = {
          ...pokeCount,
          count: --pokeCount.count,
        };
        this._myPokemons$.next([...currentValues]);
      }
    }
  }

  deleteMyPokemon(pokemon: AppPokemonItem): void {
    const currentValues = this._myPokemons$.value;
    const matchingPokemonIndex = currentValues.findIndex(
      (p) => p.name === pokemon.name
    );
    if (matchingPokemonIndex > -1) {
      currentValues.splice(matchingPokemonIndex, 1);
      this._myPokemons$.next([...currentValues]);
    }
  }
}

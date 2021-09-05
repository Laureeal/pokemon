import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AppPokemonItem } from '../models';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  _wishPokemons$: BehaviorSubject<AppPokemonItem[]> = new BehaviorSubject<
    AppPokemonItem[]
  >([]);

  get wishPokemons$(): Observable<AppPokemonItem[]> {
    return this._wishPokemons$.asObservable();
  }

  setWishList(pokemons: AppPokemonItem[]): void {
    this._wishPokemons$.next(pokemons);
  }

  createWishPokemon(pokemon: AppPokemonItem): void {
    const currentValues = this._wishPokemons$.value;
    if (currentValues.find((p) => p.name === pokemon.name)) return;
    this._wishPokemons$.next([...currentValues, { ...pokemon }]);
  }

  deleteWishPokemon(pokemon: AppPokemonItem): void {
    const currentValues = this._wishPokemons$.value;
    const matchingPokemonIndex = currentValues.findIndex(
      (p) => p.name === pokemon.name
    );
    if (matchingPokemonIndex > -1) {
      currentValues.splice(matchingPokemonIndex, 1);
      this._wishPokemons$.next([...currentValues]);
    }
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { catchError, map, shareReplay, switchMap } from 'rxjs/operators';

import {
  AppPokemonItem,
  Pokemon,
  PokemonDetailsService,
  PokemonsSuggestionsService,
  SavedPokemonsService,
} from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private _search$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _pokemons$: Observable<AppPokemonItem[]> = this.search$.pipe(
    switchMap((text) => {
      if (text) {
        const pokemons =
          this.pokemonsSuggestionsService.getMatchingPokemonsInStore(text);
        if (pokemons?.length) return of(pokemons);
        else return this.getPokemonByName(text);
      }
      return of([]);
    }),
    map((pokemons) =>
      pokemons.map((p) => ({
        ...p,
        wished: (p as AppPokemonItem).wished ?? false,
        count: (p as AppPokemonItem).count ?? 0,
      }))
    ),
    shareReplay()
  );
  pokemonsWithWish$: Observable<AppPokemonItem[]> = combineLatest([
    this._pokemons$,
    this.savedPokemonService.wishPokemons$,
  ]).pipe(
    map(([pokemons, wishes]) =>
      pokemons.map((p) => ({
        ...p,
        wished: !!wishes.find((w) => w.name === p.name),
      }))
    )
  );

  constructor(
    private pokemonsSuggestionsService: PokemonsSuggestionsService,
    private pokemonDetailsService: PokemonDetailsService,
    private savedPokemonService: SavedPokemonsService
  ) {}

  get search$(): Observable<string> {
    return this._search$.asObservable();
  }

  getPokemonByName(name: string): Observable<Pokemon[]> {
    return this.pokemonDetailsService.getPokemon(name, true).pipe(
      map((pokemon) => {
        if (pokemon) return [pokemon];
        return [];
      }),
      catchError(() => of([]))
    );
  }

  setSearch(text?: string): void {
    this._search$.next(text?.toLowerCase() ?? '');
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';

import {
  API_URL,
  AppPokemonItem,
  BaseItem,
  PokemonResponse,
  PokemonsSuggestionsService,
  SavedPokemonsService,
} from '@app/core';
import { PaginationMaterial } from '@app/shared';

@Injectable({
  providedIn: 'root',
})
export class ListAllService {
  private _pagination$: BehaviorSubject<PaginationMaterial> =
    new BehaviorSubject<PaginationMaterial>(new PaginationMaterial());
  private _response$: Observable<PokemonResponse> = this._pagination$.pipe(
    switchMap((pagination) => this.getAllPokemonsResponse(pagination)),
    tap((response) =>
      this.pokemonsSuggestionsService.addSeveralToStore(response.results)
    ),
    shareReplay()
  );
  private _pokemons$: Observable<BaseItem[]> = this._response$.pipe(
    map((response) => response.results ?? [])
  );
  pokemonsWithCount$: Observable<AppPokemonItem[]> = combineLatest([
    this._pokemons$,
    this.savedPokemonService.myPokemons$,
    this.savedPokemonService.wishPokemons$,
  ]).pipe(
    map(([pokemons, counts, wishes]) =>
      pokemons.map((p) => ({
        ...p,
        count: counts.find((c) => c.name === p.name)?.count ?? 0,
        wished: !!wishes.find((w) => w.name === p.name),
      }))
    )
  );

  count$: Observable<number> = this._response$.pipe(
    map((response) => response.count)
  );

  constructor(
    private http: HttpClient,
    private pokemonsSuggestionsService: PokemonsSuggestionsService,
    private savedPokemonService: SavedPokemonsService
  ) {}

  getAllPokemonsResponse(
    pagination: PaginationMaterial
  ): Observable<PokemonResponse> {
    return this.http.get<PokemonResponse>(`${API_URL}/pokemon/`, {
      params: {
        limit: pagination.pageSize,
        offset: pagination.pageIndex * pagination.pageSize,
      },
    });
  }

  setPagination(pagination: PaginationMaterial): void {
    this._pagination$.next(pagination);
  }
}

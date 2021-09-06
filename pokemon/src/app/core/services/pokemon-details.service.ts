import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { API_URL, notFoundParam } from '../config';
import { Pokemon } from '../models';
import { PokemonsSuggestionsService } from './pokemons-suggestions.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonDetailsService {
  constructor(
    private http: HttpClient,
    private pokemonsSuggestionsService: PokemonsSuggestionsService
  ) {}

  getPokemon(
    name: string,
    isSilentNotFound: boolean = false
  ): Observable<Pokemon> {
    const storedPokemon: Pokemon | undefined =
      this.pokemonsSuggestionsService.getExactMatchingPokemonInStore(name);
    if (storedPokemon) return of(storedPokemon);
    return this.http
      .get<Pokemon>(`${API_URL}/pokemon/${name}`, {
        params: { [notFoundParam]: isSilentNotFound },
      })
      .pipe(
        tap((pokemon) => {
          if (pokemon) {
            this.pokemonsSuggestionsService.addOneToStore(pokemon, true);
          }
        })
      );
  }
}

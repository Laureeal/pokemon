import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppPokemonItem, SavedPokemonsService } from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class MyListService {
  pokemons$: Observable<AppPokemonItem[]> = combineLatest([
    this.savedPokemonsService.myPokemons$,
    this.savedPokemonsService.wishPokemons$,
  ]).pipe(
    map(([counts, wishes]) => {
      return counts.map((c) => ({
        ...c,
        wished: !!wishes.find((w) => w.name === c.name),
      }));
    })
  );

  constructor(private savedPokemonsService: SavedPokemonsService) {}
}

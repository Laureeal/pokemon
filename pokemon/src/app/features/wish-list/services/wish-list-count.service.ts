import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppPokemonItem, SavedPokemonsService } from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class WishListCountService {
  pokemons$: Observable<AppPokemonItem[]> = combineLatest([
    this.savedPokemonsService.wishPokemons$,
    this.savedPokemonsService.myPokemons$,
  ]).pipe(
    map(([wishes, counts]) => {
      return wishes.map((w) => ({
        ...w,
        wished: true,
        count: counts.find((c) => w.name === c.name)?.count ?? 0,
      }));
    })
  );

  constructor(private savedPokemonsService: SavedPokemonsService) {}
}

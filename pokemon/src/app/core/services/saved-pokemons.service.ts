import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppPokemonItem } from '../models';
import { PersonalListService } from './personal-list.service';
import { WishListService } from './wish-list.service';

@Injectable({
  providedIn: 'root',
})
export class SavedPokemonsService {
  myPokemons$: Observable<AppPokemonItem[]> =
    this.personalListService.myPokemons$;
  wishPokemons$: Observable<AppPokemonItem[]> =
    this.wishListService.wishPokemons$;

  constructor(
    private personalListService: PersonalListService,
    private wishListService: WishListService
  ) {}

  getAppPokemonItem(name: string): Observable<AppPokemonItem> {
    return combineLatest([this.myPokemons$, this.wishPokemons$]).pipe(
      map(([counts, wishes]) => {
        return {
          name,
          count: counts.find((c) => c.name === name)?.count ?? 0,
          wished: !!wishes.find((w) => w.name === name),
        };
      })
    );
  }
}

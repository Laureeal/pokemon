import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { first, map, mapTo, tap } from 'rxjs/operators';

import { User } from '../models';
import { LocalStorageService } from './local-storage.service';
import { PersonalListService } from './personal-list.service';
import { PokemonsSuggestionsService } from './pokemons-suggestions.service';
import { WishListService } from './wish-list.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _user$: BehaviorSubject<User | undefined> = new BehaviorSubject<
    User | undefined
  >(undefined);

  isConnected$: Observable<boolean> = this._user$.pipe(map((u) => !!u));

  constructor(
    private localStorageService: LocalStorageService,
    private personalListService: PersonalListService,
    private wishListService: WishListService,
    private pokemonsSuggestionsService: PokemonsSuggestionsService
  ) {}

  get user$(): Observable<User | undefined> {
    return this._user$.asObservable();
  }

  checkLastUser(): void {
    const user = this.localStorageService.getLastUser();
    if (user) this.initUser(user);
    else this._user$.next(undefined);
  }

  loadOrCreateUser(username: string): boolean {
    const user = this.localStorageService.getUser(username);
    if (user) this.initUser(user);
    else {
      const newUser = { username, wishList: [], personalList: [] };
      this.localStorageService.setUser(newUser);
      this._user$.next(newUser);
    }
    return !!user;
  }

  logOut(): Observable<void> {
    return this.resetUser().pipe(
      tap(() => {
        this.localStorageService.logOut();
        this._user$.next(undefined);
      })
    );
  }

  resetUser(): Observable<void> {
    return combineLatest([
      this._user$,
      this.personalListService.myPokemons$,
      this.wishListService.wishPokemons$,
    ]).pipe(
      first(),
      tap(([user, myList, wishList]) => {
        this.localStorageService.setUser({
          username: user?.username ?? '',
          personalList: myList ?? [],
          wishList: wishList ?? [],
        });
        this.personalListService.setMyList([]);
        this.wishListService.setWishList([]);
        this._user$.next(undefined);
      }),
      mapTo(void 0)
    );
  }

  private initUser(user: User): void {
    this._user$.next(user);
    this.personalListService.setMyList(user.personalList ?? []);
    this.pokemonsSuggestionsService.addSeveralToStore([
      ...(user.personalList ?? []),
    ]);
    this.wishListService.setWishList(user.wishList ?? []);
    this.localStorageService.setUser(user);
  }
}

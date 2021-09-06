import { Injectable } from '@angular/core';

import { User } from '../models';

// This service handles user data (saved Pokemons) (to keep "in memory" what the user saved and for the suggestions)

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private readonly _userPrefix: string = 'user-';
  private readonly _lastUser: string = 'last-user';

  setUser(user: User): void {
    localStorage.setItem(
      `${this._userPrefix}${user.username}`,
      this.stringify(user)
    );
  }

  getUser(username: string, setLastUser: boolean = true): User | undefined {
    if (username && setLastUser) {
      localStorage.setItem(`${this._lastUser}`, username);
    }
    const item = localStorage.getItem(`${this._userPrefix}${username}`);
    if (item) return this.parse(item) as User;
    return undefined;
  }

  getLastUser(): User | undefined {
    const username = localStorage.getItem(`${this._lastUser}`);
    if (username) return this.getUser(username, false) as User;
    return undefined;
  }

  logOut(): void {
    localStorage.removeItem(`${this._lastUser}`);
  }

  private stringify(data: unknown): string {
    return JSON.stringify(data);
  }

  private parse(data: string): unknown {
    return JSON.parse(data);
  }
}

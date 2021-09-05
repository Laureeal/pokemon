import { Injectable } from '@angular/core';

// This service handles seen Pokemons data during the browser session (for suggestions in the search)
// and seen properties urls (for property explorer)

@Injectable({
  providedIn: 'root',
})
export class SessionStorageService {
  private readonly _seenPropertiesUrls: string = 'seen-properties-urls';
  private readonly _seenPokemons: string = 'seen-pokemons';

  get suggestions(): string[] {
    return this.getItemsByKey(this._seenPokemons);
  }

  set suggestions(items: string[]) {
    this.setItemsByKey(items, this._seenPokemons);
  }

  get seenPropertiesUrls(): string[] {
    return this.getItemsByKey(this._seenPropertiesUrls);
  }

  set seenPropertiesUrls(items: string[]) {
    this.setItemsByKey(items, this._seenPropertiesUrls);
  }

  private setItemsByKey(items: string[], key: string): void {
    let parsed: string[] = [];
    const storageItems = sessionStorage.getItem(key);
    if (storageItems) parsed = this.parse(storageItems) as string[];
    const noDuplicatesArray = Array.from(
      new Set([...(parsed ?? []), ...items])
    );
    const data = this.stringify(noDuplicatesArray);
    sessionStorage.setItem(key, data);
  }

  private getItemsByKey(key: string): string[] {
    const items = sessionStorage.getItem(key);
    if (items) {
      return this.parse(items) as string[];
    }
    return [];
  }

  private stringify(data: unknown): string {
    return JSON.stringify({ data });
  }

  private parse(data: string): unknown {
    return JSON.parse(data)?.data;
  }
}

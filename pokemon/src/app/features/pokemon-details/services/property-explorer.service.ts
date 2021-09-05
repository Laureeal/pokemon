import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, map, shareReplay, switchMap, tap } from 'rxjs/operators';

import { SessionStorageService } from '@app/core';
import { Property } from '../models/property';

@Injectable({
  providedIn: 'root',
})
export class PropertyExplorerService {
  private _url$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _properties$: BehaviorSubject<Property[]> = new BehaviorSubject<
    Property[]
  >([]);
  property$: Observable<Property | undefined> = this._properties$.pipe(
    map((properties) => properties[properties.length - 1]),
    shareReplay()
  );
  isNotLastProperty$: Observable<boolean> = this._properties$.pipe(
    map((properties) => properties.length > 1),
    shareReplay()
  );
  private _seenPropertiesUrls$: BehaviorSubject<string[]> = new BehaviorSubject<
    string[]
  >([]);

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {}

  get seenPropertiesUrl$(): Observable<string[]> {
    return this._seenPropertiesUrls$.asObservable();
  }

  initUrl(): Observable<unknown> {
    return this._url$.pipe(
      filter((url) => !!url),
      switchMap((url) => this.getNewProperty(url)),
      tap((prop) => this.addToSessionProperties(prop))
    );
  }

  initSeenPropertiesUrls(): void {
    const stored = this.sessionStorageService.seenPropertiesUrls;
    this._seenPropertiesUrls$.next(stored ?? []);
  }

  resetUrl(): void {
    this._url$.next('');
  }

  setUrl(url: string): void {
    this._url$.next(url);
    if (url) this.addToSeenPropertiesUrls(url);
  }

  removeLastProperty(): void {
    this._properties$.value.pop();
    this._properties$.next([...this._properties$.value]);
  }

  resetSessionList(): void {
    this._properties$.next([]);
  }

  isSeenUrl(url: string): boolean {
    return this._seenPropertiesUrls$.value.includes(url);
  }

  storeSeenPropertiesUrls(): void {
    this.sessionStorageService.seenPropertiesUrls =
      this._seenPropertiesUrls$.value;
  }

  private getNewProperty(url: string): Observable<Property> {
    return this.http.get<Property>(url);
  }

  private addToSeenPropertiesUrls(url: string): void {
    if (this._seenPropertiesUrls$.value.includes(url)) return undefined;
    this._seenPropertiesUrls$.next([...this._seenPropertiesUrls$.value, url]);
  }

  private addToSessionProperties(property: Property): void {
    this._properties$.next([...this._properties$.value, { ...property }]);
  }
}

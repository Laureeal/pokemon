import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';

import {
  AppPokemonItem,
  Pokemon,
  PokemonDetailsService,
  SavedPokemonsService,
  UserService,
} from '@app/core';
import { PropertyExplorerService } from '../../services/property-explorer.service';
import { PropertyExplorerComponent } from '../property-explorer/property-explorer.component';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonDetailsComponent implements OnInit, OnDestroy {
  pokemon$: Observable<Pokemon> = this.route.params.pipe(
    switchMap(({ name }) => this.pokemonDetailsService.getPokemon(name)),
    tap((pokemon) => this.setImgUrl(pokemon.sprites.front_default)),
    shareReplay()
  );
  seenPropertiesUrl$: Observable<string[]> =
    this.propertyExplorerService.seenPropertiesUrl$;
  isConnected$: Observable<boolean> = this.userService.isConnected$;
  appPokemonItem$: Observable<AppPokemonItem> = this.pokemon$.pipe(
    switchMap((pokemon) =>
      this.savedPokemonsService.getAppPokemonItem(pokemon.name)
    )
  );
  imgUrl$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private subscriptions: Subscription = new Subscription();

  constructor(
    private pokemonDetailsService: PokemonDetailsService,
    private route: ActivatedRoute,
    private propertyExplorerService: PropertyExplorerService,
    private dialog: MatDialog,
    private userService: UserService,
    private savedPokemonsService: SavedPokemonsService
  ) {}

  ngOnInit(): void {
    const subscription: Subscription = this.propertyExplorerService
      .initUrl()
      .subscribe();
    this.subscriptions.add(subscription);

    this.propertyExplorerService.initSeenPropertiesUrls();
  }

  ngOnDestroy(): void {
    this.propertyExplorerService.resetUrl();
    this.subscriptions.unsubscribe();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    this.propertyExplorerService.storeSeenPropertiesUrls();
  }

  propertyClick(url: string): void {
    this.propertyExplorerService.setUrl(url);
    const subscription = this.dialog
      .open(PropertyExplorerComponent)
      .afterClosed()
      .subscribe(() => this.propertyExplorerService.resetSessionList());
    this.subscriptions.add(subscription);
  }

  setImgUrl(url: string): void {
    if (url) this.imgUrl$.next(url);
  }
}

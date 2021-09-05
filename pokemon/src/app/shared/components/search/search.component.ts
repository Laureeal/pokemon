import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, tap } from 'rxjs/operators';

import { AppPokemonItem, UserService } from '@app/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  searchControl: FormControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(3),
    Validators.pattern('[a-zA-Z]*'),
  ]);
  isConnected$: Observable<boolean> = this.userService.isConnected$;
  pokemons$: Observable<AppPokemonItem[]> =
    this.searchService.pokemonsWithWish$;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    const subscription = this.searchControl.valueChanges
      .pipe(
        debounceTime(200),
        tap((value) => {
          if (this.searchControl.valid) this.searchService.setSearch(value);
          if (!value || value.length === 0)
            this.searchService.setSearch(undefined);
        })
      )
      .subscribe();
    this.subscriptions.add(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  closeSearch(): void {
    this.searchControl.patchValue(undefined);
  }
}

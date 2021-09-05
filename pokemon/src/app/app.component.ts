import { Component, HostListener, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { PokemonsSuggestionsService, UserService } from '@app/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private userService: UserService,
    private pokemonsSuggestionsService: PokemonsSuggestionsService
  ) {}

  ngOnInit(): void {
    this.userService.checkLastUser();
    this.pokemonsSuggestionsService.initSuggestions();
  }

  @HostListener('window:beforeunload')
  onBeforeUnload(): void {
    this.userService.resetUser().pipe(first()).subscribe();
    this.pokemonsSuggestionsService.storeSuggestions();
  }

  onRouterActivate(): void {
    window.scrollTo(0, 0);
  }
}

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { AppPokemonItem } from '@app/core';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-pokemon-items-list',
  templateUrl: './pokemon-items-list.component.html',
  styleUrls: ['./pokemon-items-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonItemsListComponent {
  @Input() pokemons: AppPokemonItem[] = [];
  @Input() isConnected: boolean = false;
  @Input() canDeleteCount: boolean = false;
  @Input() canDeleteWish: boolean = false;
  searchText$: Observable<string> = this.searchService.search$;

  constructor(private searchService: SearchService) {}
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AppPokemonItem } from '@app/core';
import { WishListCountService } from '../../services/wish-list-count.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WishListComponent {
  pokemons$: Observable<AppPokemonItem[]> = this.wishListCountService.pokemons$;

  constructor(private wishListCountService: WishListCountService) {}
}

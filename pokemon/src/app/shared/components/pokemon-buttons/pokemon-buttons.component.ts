import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  AppPokemonItem,
  PersonalListService,
  WishListService,
} from '@app/core';

@Component({
  selector: 'app-pokemon-buttons',
  templateUrl: './pokemon-buttons.component.html',
  styleUrls: ['./pokemon-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonButtonsComponent {
  @Input() pokemon!: AppPokemonItem;
  @Input() canDeleteCount: boolean = false;
  @Input() canDeleteWish: boolean = false;

  constructor(
    private personalListService: PersonalListService,
    private wishListService: WishListService
  ) {}

  addToMyList(): void {
    this.personalListService.createMyPokemon(this.pokemon);
  }

  removeCountFromMyList(): void {
    this.personalListService.removeMyPokemon(this.pokemon);
  }

  deleteFromMyList(): void {
    this.personalListService.deleteMyPokemon(this.pokemon);
  }

  addToWishList(): void {
    this.wishListService.createWishPokemon(this.pokemon);
  }

  deleteFromWishList(): void {
    this.wishListService.deleteWishPokemon(this.pokemon);
  }
}

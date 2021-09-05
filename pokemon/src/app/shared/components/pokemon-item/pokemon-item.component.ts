import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AppPokemonItem } from '@app/core';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonItemComponent {
  @Input() pokemon!: AppPokemonItem;
  @Input() isConnected: boolean = false;
  @Input() canDeleteCount: boolean = false;
  @Input() canDeleteWish: boolean = false;
}

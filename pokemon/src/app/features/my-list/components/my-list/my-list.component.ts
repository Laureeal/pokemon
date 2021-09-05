import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';

import { AppPokemonItem } from '@app/core';
import { MyListService } from '../../services/my-list.service';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyListComponent {
  pokemons$: Observable<AppPokemonItem[]> = this.myListService.pokemons$;

  constructor(private myListService: MyListService) {}
}

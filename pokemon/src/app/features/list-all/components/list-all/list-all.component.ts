import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppPokemonItem, UserService } from '@app/core';
import { PaginationMaterial } from '@app/shared';
import { ListAllService } from '../../services/list-all.service';

@Component({
  selector: 'app-list-all',
  templateUrl: './list-all.component.html',
  styleUrls: ['./list-all.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListAllComponent {
  pokemons$: Observable<AppPokemonItem[]> =
    this.listAllService.pokemonsWithCount$.pipe(
      map((p) => {
        if (!p) return [];
        return p;
      })
    );
  count$: Observable<number> = this.listAllService.count$;
  isConnected$: Observable<boolean> = this.userService.isConnected$;

  constructor(
    private listAllService: ListAllService,
    private userService: UserService
  ) {}

  setPagination(pagination: PaginationMaterial): void {
    this.listAllService.setPagination(pagination);
    setTimeout(() => window.scrollTo(0, 530));
  }
}

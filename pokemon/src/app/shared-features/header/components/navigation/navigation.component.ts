import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { first } from 'rxjs/operators';

import { User, UserService } from '@app/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavigationComponent {
  @Input() user!: User;

  constructor(private userService: UserService) {}

  logOut(): void {
    this.userService.logOut().pipe(first()).subscribe();
  }
}

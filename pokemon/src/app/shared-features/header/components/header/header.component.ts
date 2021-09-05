import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

import { User, UserService } from '@app/core';
import { LoginComponent } from '../../components/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  user$: Observable<User | undefined> = this.userService.user$;

  constructor(private userService: UserService, private dialog: MatDialog) {}

  openLoginDialog(): void {
    this.dialog.open(LoginComponent);
  }
}

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslocoService } from '@ngneat/transloco';

import { UserService } from '@app/core';

// not an actual login (with regular password check, only set the username)

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  usernameControl: FormControl = this.fb.control('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
    private transloco: TranslocoService,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {}

  submitUsername(): void {
    if (this.usernameControl.valid) {
      const isExistingUser = this.userService.loadOrCreateUser(
        this.usernameControl.value
      );
      if (!isExistingUser)
        this.snackBar.open(
          this.transloco.translate('login.new_user', {
            username: this.usernameControl.value,
          }),
          this.transloco.translate('login.got_it')
        );
      this.dialogRef.close();
    }
  }
}

import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class IsConnectedGuard implements CanActivate {
  constructor(public userService: UserService) {}

  canActivate(): Observable<boolean> {
    return this.userService.isConnected$;
  }
}

/* eslint-disable */
import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { notFoundParam } from '../config';

@Injectable()
export class NotFoundInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (!request.params?.get(notFoundParam) && error.status === 404) {
          this.router.navigateByUrl('/not-found', { skipLocationChange: true });
        }
        return throwError(error);
      })
    );
  }
}

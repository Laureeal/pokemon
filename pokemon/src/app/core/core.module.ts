import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { TranslocoRootModule } from '@app/transloco/transloco-root.module';
import { environment } from '@env/environment';
import { TRANSLOCO_CONFIG, translocoConfig } from '@ngneat/transloco';

import { NotFoundInterceptor } from './interceptors/not-found.interceptor';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en'],
        defaultLang: 'en',
        prodMode: environment.production,
      }),
    },
    { provide: HTTP_INTERCEPTORS, useClass: NotFoundInterceptor, multi: true },
  ],
  imports: [HttpClientModule, TranslocoRootModule],
  exports: [],
})
export class CoreModule {}

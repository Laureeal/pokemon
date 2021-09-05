import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from '@app/core';
import { SharedModule } from '@app/shared';
import { HeaderModule } from '@app/shared-features/header/header.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    SharedModule,
    BrowserAnimationsModule,
    NgbModule,
    HeaderModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

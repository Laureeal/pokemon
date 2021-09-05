import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared';

import {
  HeaderComponent,
  LoginComponent,
  NavigationComponent,
} from './components';

const components = [HeaderComponent, NavigationComponent, LoginComponent];

@NgModule({
  declarations: [...components],
  imports: [SharedModule, RouterModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}

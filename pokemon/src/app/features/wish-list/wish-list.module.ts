import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { WishListComponent } from './components/wish-list/wish-list.component';
import { WishListRoutingModule } from './wish-list-routing.module';

@NgModule({
  declarations: [WishListComponent],
  imports: [SharedModule, WishListRoutingModule],
})
export class WishListModule {}

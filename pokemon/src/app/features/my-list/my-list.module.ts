import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { MyListComponent } from './components/my-list/my-list.component';
import { MyListRoutingModule } from './my-list-routing.module';

@NgModule({
  declarations: [MyListComponent],
  imports: [SharedModule, MyListRoutingModule],
})
export class MyListModule {}

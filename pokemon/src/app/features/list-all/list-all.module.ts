import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';

import { ListAllComponent } from './components/list-all/list-all.component';
import { ListAllRoutingModule } from './list-all-routing.module';

@NgModule({
  declarations: [ListAllComponent],
  imports: [SharedModule, ListAllRoutingModule],
})
export class ListAllModule {}

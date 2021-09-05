import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListAllComponent } from './components/list-all/list-all.component';

const routes: Routes = [
  {
    path: '',
    component: ListAllComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListAllRoutingModule {}

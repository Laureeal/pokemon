import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

const routes: Routes = [
  {
    path: ':name',
    component: PokemonDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonDetailsRoutingModule {}

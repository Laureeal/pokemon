import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsConnectedGuard } from '@app/core';

const routes: Routes = [
  {
    path: '',
    loadChildren: async () =>
      import('./features/list-all/list-all.module').then(
        (m) => m.ListAllModule
      ),
  },
  {
    path: 'pokemon',
    loadChildren: async () =>
      import('./features/pokemon-details/pokemon-details.module').then(
        (m) => m.PokemonDetailsModule
      ),
  },
  {
    path: 'my-list',
    loadChildren: async () =>
      import('./features/my-list/my-list.module').then((m) => m.MyListModule),
    canActivate: [IsConnectedGuard],
  },
  {
    path: 'my-wish-list',
    loadChildren: async () =>
      import('./features/wish-list/wish-list.module').then(
        (m) => m.WishListModule
      ),
    canActivate: [IsConnectedGuard],
  },
  {
    path: 'not-found',
    loadChildren: async () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      ),
  },
  {
    path: '**',
    redirectTo: '/not-found',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

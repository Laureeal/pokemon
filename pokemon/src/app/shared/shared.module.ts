import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@ngneat/transloco';

import {
  PokemonButtonsComponent,
  PokemonItemComponent,
  PokemonItemsListComponent,
  SearchComponent,
} from './components';
import {
  FilterListByNamePipe,
  OrderByNamePipe,
  OrderByNameSubKeyPipe,
} from './pipes';

const components = [
  PokemonButtonsComponent,
  PokemonItemComponent,
  PokemonItemsListComponent,
  SearchComponent,
];

const pipes = [FilterListByNamePipe, OrderByNamePipe, OrderByNameSubKeyPipe];

const vendors = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,

  MatDialogModule,
  MatIconModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSnackBarModule,

  TranslocoModule,
];

@NgModule({
  declarations: [...components, ...pipes],
  imports: [...vendors],
  providers: [],
  exports: [...vendors, ...components, ...pipes],
})
export class SharedModule {}

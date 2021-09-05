import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared';
import {
  PokemonDetailsComponent,
  PropertyExplorerComponent,
} from './components';
import { IsSeenUrlDirective, StaticIsSeenUrlDirective } from './directives';
import { CleanKeyPipe, GetTypePipe, ToEntriesPipe } from './pipes';

import { PokemonDetailsRoutingModule } from './pokemon-details-routing.module';

const components = [PokemonDetailsComponent, PropertyExplorerComponent];

const pipes = [ToEntriesPipe, GetTypePipe, CleanKeyPipe];

const directives = [IsSeenUrlDirective, StaticIsSeenUrlDirective];

@NgModule({
  declarations: [...components, ...pipes, ...directives],
  imports: [SharedModule, PokemonDetailsRoutingModule],
})
export class PokemonDetailsModule {}

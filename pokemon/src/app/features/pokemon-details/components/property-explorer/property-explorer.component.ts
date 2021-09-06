import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { BaseItem, PokemonsSuggestionsService } from '@app/core';
import { Observable } from 'rxjs';

import { Property } from '../../models/property';
import { PropertyType } from '../../models/property-type';
import { PropertyExplorerService } from '../../services/property-explorer.service';

@Component({
  selector: 'app-property-explorer',
  templateUrl: './property-explorer.component.html',
  styleUrls: ['./property-explorer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertyExplorerComponent {
  property$: Observable<Property | undefined> =
    this.propertyExplorerService.property$;
  isNotLastProperty$: Observable<boolean> =
    this.propertyExplorerService.isNotLastProperty$;
  propertyType: typeof PropertyType = PropertyType;

  readonly pokemonUrlSegment: string = '/pokemon/';

  constructor(
    private propertyExplorerService: PropertyExplorerService,
    private dialogRef: MatDialogRef<PropertyExplorerComponent>,
    private pokemonsSuggestionsService: PokemonsSuggestionsService
  ) {}

  setProperty(property: BaseItem): void {
    if (!property.url) return undefined;
    this.propertyExplorerService.setUrl(property.url);
    if (property.name && property.url.includes(this.pokemonUrlSegment)) {
      this.pokemonsSuggestionsService.addOneToStore(property);
    }
    document.getElementById('title')?.scrollIntoView();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  goBack(): void {
    this.propertyExplorerService.removeLastProperty();
  }
}

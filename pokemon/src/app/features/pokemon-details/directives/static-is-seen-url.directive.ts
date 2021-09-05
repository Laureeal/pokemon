import { Directive, ElementRef, Input } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { PropertyExplorerService } from '../services/property-explorer.service';

@Directive({
  selector: '[appStaticIsSeenUrl]',
})
export class StaticIsSeenUrlDirective {
  constructor(
    private elementRef: ElementRef,
    private propertyExplorerService: PropertyExplorerService,
    private transloco: TranslocoService
  ) {}

  @Input() set appStaticIsSeenUrl(url: string) {
    if (this.propertyExplorerService.isSeenUrl(url)) {
      this.elementRef.nativeElement.classList.add('is-seen');
      this.elementRef.nativeElement.title =
        this.transloco.translate('general.seen_item');
    }
  }
}

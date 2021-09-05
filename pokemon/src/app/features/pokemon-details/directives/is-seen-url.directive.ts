import { Directive, ElementRef, Input, OnChanges } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Directive({
  selector: '[appIsSeenUrl]',
})
export class IsSeenUrlDirective implements OnChanges {
  @Input() appIsSeenUrl!: string;
  @Input() seenUrls!: string[];

  constructor(
    private elementRef: ElementRef,
    private transloco: TranslocoService
  ) {}

  ngOnChanges(): void {
    if (this.seenUrls.includes(this.appIsSeenUrl)) {
      this.elementRef.nativeElement.classList.add('is-seen');
      this.elementRef.nativeElement.title =
        this.transloco.translate('general.seen_item');
    }
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanKey',
})
export class CleanKeyPipe implements PipeTransform {
  transform(key: string): string {
    if (!key) return '';
    return key.replace(/_/g, ' ');
  }
}

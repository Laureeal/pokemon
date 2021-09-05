import { Pipe, PipeTransform } from '@angular/core';

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

@Pipe({
  name: 'toEntries',
})
export class ToEntriesPipe implements PipeTransform {
  transform<T>(value: T): Entries<T> | undefined {
    if (!value) return undefined;
    return Object.entries(value) as Entries<T>;
  }
}

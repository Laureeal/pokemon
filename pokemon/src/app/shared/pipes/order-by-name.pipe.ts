import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByName',
})
export class OrderByNamePipe implements PipeTransform {
  transform<T extends { name?: string }>(values: T[]): T[] {
    return (
      values.sort((a, b) => {
        if (a.name && b.name) return a.name.localeCompare(b.name);
        return 0;
      }) ?? []
    );
  }
}

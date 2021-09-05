import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderByNameSubKey',
})
export class OrderByNameSubKeyPipe implements PipeTransform {
  transform<T extends { [key: string]: { name: string; url: string } }>(
    values: T[],
    key: string
  ): T[] {
    return (
      values.sort((a, b) => {
        if (a[key]?.name && b[key]?.name)
          return a[key].name.localeCompare(b[key].name);
        return 0;
      }) ?? []
    );
  }
}

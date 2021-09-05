import { Pipe, PipeTransform } from '@angular/core';
import { AppPokemonItem } from '@app/core';

@Pipe({
  name: 'filterByName',
})
export class FilterListByNamePipe implements PipeTransform {
  transform(values: AppPokemonItem[], text?: string | null): AppPokemonItem[] {
    if (!text) return values;
    const filteredItems = values.filter((v) => v.name.includes(text));
    if (filteredItems?.length) return filteredItems;
    return values;
  }
}

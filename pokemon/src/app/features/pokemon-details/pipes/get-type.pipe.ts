import { Pipe, PipeTransform } from '@angular/core';
import { PropertyType } from '../models/property-type';

@Pipe({
  name: 'getType',
})
export class GetTypePipe implements PipeTransform {
  transform(value: unknown): PropertyType {
    if (Array.isArray(value)) {
      return value.length ? PropertyType.ARRAY : PropertyType.NOT_FOUND;
    }
    if (typeof value === 'object') return PropertyType.OBJECT;
    if (typeof value === 'string') {
      return value.length ? PropertyType.STRING : PropertyType.NOT_FOUND;
    }
    if (typeof value === 'number') return PropertyType.NUMBER;
    if (typeof value === 'boolean') return PropertyType.BOOLEAN;
    return PropertyType.NOT_FOUND;
  }
}

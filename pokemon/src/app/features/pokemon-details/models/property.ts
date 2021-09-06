import { BaseItem } from '@app/core';

export interface Property {
  [key: string]: BaseItem | Property | Property[] | number | string;
}

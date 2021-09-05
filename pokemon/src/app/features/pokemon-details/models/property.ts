import { BaseItem } from '@app/core';

export interface Property {
  [key: string]: Property | Property[] | BaseItem | string | number;
}

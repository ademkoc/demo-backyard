import { EntitySchema, OptionalProps } from '@mikro-orm/core';

export interface CustomBaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  [OptionalProps]?: 'createdAt' | 'updatedAt';
}

export const CustomBaseEntitySchema = new EntitySchema<CustomBaseEntity>({
  name: 'CustomBaseEntity',
  abstract: true,
  properties: {
    id: { type: 'number', primary: true },
    createdAt: { type: 'Date', onCreate: () => new Date(), nullable: true },
    updatedAt: { type: 'Date', onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true }
  }
});

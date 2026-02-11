import { Collection, EntitySchema, ReferenceKind } from '@mikro-orm/core';
import { CarRepository } from './car.repository.ts';
import { type BaseEntity, BaseEntitySchema } from '../common/base.entity.ts';
import { type IRental } from '../rental/rental.entity.ts';

export interface ICar extends BaseEntity {
  brand: string;
  model: string;
  year: string;
  km: number;
  isAvailable?: boolean;
  rentals: Collection<IRental>;
}

export const Car = new EntitySchema<ICar, BaseEntity>({
  name: 'Car',
  extends: BaseEntitySchema,
  repository: () => CarRepository,
  properties: {
    brand: { type: 'varchar', length: 255 },
    model: { type: 'varchar', length: 255 },
    year: { type: 'varchar', length: 4 },
    km: { type: 'int' },
    isAvailable: { type: 'boolean', default: true },
    rentals: {
      kind: ReferenceKind.ONE_TO_MANY,
      entity: 'Rental',
      mappedBy: 'car'
    }
  }
});

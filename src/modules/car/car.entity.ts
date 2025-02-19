import { Collection, EntitySchema, ReferenceKind } from '@mikro-orm/core';
import { CustomBaseEntity, CustomBaseEntitySchema } from '../common/base.entity.ts';
import { IRental } from '../rental/rental.entity.ts';
import { CarRepository } from './car.repository.ts';

export interface ICar {
  brand: string;
  model: string;
  year: string;
  km: string;
  isAvailable: boolean;
  customers: Collection<IRental>;
}

export const Car = new EntitySchema<ICar, CustomBaseEntity>({
  name: 'Car',
  extends: CustomBaseEntitySchema,
  repository: () => CarRepository,
  properties: {
    brand: { type: 'varchar', length: 255, nullable: false },
    model: { type: 'varchar', length: 255, nullable: false },
    year: { type: 'varchar', length: 4, nullable: false },
    km: { type: 'int', nullable: false },
    isAvailable: { type: 'boolean', default: true },
    customers: {
      kind: ReferenceKind.MANY_TO_MANY,
      owner: true,
      type: 'Rental',
      inversedBy: 'cars'
    }
  }
});

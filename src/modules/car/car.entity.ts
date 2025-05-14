import { EntitySchema } from '@mikro-orm/core';
import { type BaseEntity, BaseEntitySchema } from '../common/base.entity.ts';
import { CarRepository } from './car.repository.ts';

export interface ICar extends BaseEntity {
  brand: string;
  model: string;
  year: string;
  km: string;
  isAvailable?: boolean;
}

export const Car = new EntitySchema<ICar, BaseEntity>({
  name: 'Car',
  extends: BaseEntitySchema,
  repository: () => CarRepository,
  properties: {
    brand: { type: 'varchar', length: 255, nullable: false },
    model: { type: 'varchar', length: 255, nullable: false },
    year: { type: 'varchar', length: 4, nullable: false },
    km: { type: 'int', nullable: false },
    isAvailable: { type: 'boolean', default: true }
  }
});

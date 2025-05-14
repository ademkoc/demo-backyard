import { Collection, EntitySchema, ReferenceKind } from '@mikro-orm/core';
import { type BaseEntity, BaseEntitySchema } from '../common/base.entity.ts';
import { Car, type ICar } from '../car/car.entity.ts';
import { CustomerRepository } from './customer.repository.ts';

export interface ICustomer extends BaseEntity {
  name: string;
  surname: string;
  birthdate: Date;
  cars: Collection<ICar>;
}

export const Customer = new EntitySchema<ICustomer, BaseEntity>({
  name: 'Customer',
  extends: BaseEntitySchema,
  repository: () => CustomerRepository,
  properties: {
    name: { type: 'varchar', length: 255, nullable: false },
    surname: { type: 'varchar', length: 255, nullable: false },
    birthdate: { type: 'date', nullable: false },
    cars: {
      kind: ReferenceKind.MANY_TO_MANY,
      entity: () => Car,
      pivotEntity: 'Rental',
      fixedOrder: true
    }
  }
});

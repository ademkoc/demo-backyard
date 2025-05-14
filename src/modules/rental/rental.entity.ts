import { EntitySchema, ReferenceKind } from '@mikro-orm/core';
import { type BaseEntity, BaseEntitySchema } from '../common/base.entity.ts';
import { Car, type ICar } from '../car/car.entity.ts';
import { Customer, type ICustomer } from '../customer/customer.entity.ts';
import { RentalRepository } from './rental.repository.ts';

export interface IRental extends BaseEntity {
  customer: ICustomer;
  car: ICar;
  rentDate: Date;
}

export const Rental = new EntitySchema<IRental, BaseEntity>({
  name: 'Rental',
  extends: BaseEntitySchema,
  repository: () => RentalRepository,
  properties: {
    customer: {
      kind: ReferenceKind.MANY_TO_ONE,
      entity: () => Customer
    },
    car: {
      kind: ReferenceKind.MANY_TO_ONE,
      entity: () => Car
    },
    rentDate: { type: 'date', nullable: true }
  }
});

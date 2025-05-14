import { EntitySchema, ReferenceKind } from '@mikro-orm/core';
import { RentalRepository } from './rental.repository.ts';
import { type BaseEntity, BaseEntitySchema } from '../common/base.entity.ts';
import { type ICar } from '../car/car.entity.ts';
import { type ICustomer } from '../customer/customer.entity.ts';

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
      entity: 'Customer'
    },
    car: {
      kind: ReferenceKind.MANY_TO_ONE,
      entity: 'Car'
    },
    rentDate: { type: 'date', nullable: true }
  }
});

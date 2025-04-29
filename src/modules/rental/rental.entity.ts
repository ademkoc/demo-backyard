import { EntitySchema, ReferenceKind } from '@mikro-orm/core';
import { type CustomBaseEntity, CustomBaseEntitySchema } from '../common/base.entity.ts';
import { Car, type ICar } from '../car/car.entity.ts';
import { Customer, type ICustomer } from '../customer/customer.entity.ts';

export interface IRental {
  customers: ICustomer;
  cars: ICar;
  rentDate: Date;
}

export const Rental = new EntitySchema<IRental, CustomBaseEntity>({
  name: 'Rental',
  extends: CustomBaseEntitySchema,
  properties: {
    customers: {
      kind: ReferenceKind.MANY_TO_ONE,
      entity: () => Customer
    },
    cars: {
      kind: ReferenceKind.MANY_TO_ONE,
      entity: () => Car
    },
    rentDate: { type: 'date', nullable: true }
  }
});

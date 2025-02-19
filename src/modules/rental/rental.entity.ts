import { Collection, EntitySchema, ReferenceKind } from '@mikro-orm/core';
import { CustomBaseEntity, CustomBaseEntitySchema } from '../common/base.entity.ts';
import { ICar } from '../car/car.entity.ts';
import { ICustomer } from '../customer/customer.entity.ts';

export interface IRental {
  customers: Collection<ICustomer>;
  cars: Collection<ICar>;
  rentDate: Date;
}

export const Rental = new EntitySchema<IRental, CustomBaseEntity>({
  name: 'Rental',
  extends: CustomBaseEntitySchema,
  properties: {
    customers: {
      kind: ReferenceKind.MANY_TO_MANY,
      owner: false,
      type: 'Customer',
      mappedBy: 'cars'
    },
    cars: {
      kind: ReferenceKind.MANY_TO_MANY,
      owner: false,
      type: 'Car',
      mappedBy: 'customers'
    },
    rentDate: { type: 'date', nullable: true }
  }
});

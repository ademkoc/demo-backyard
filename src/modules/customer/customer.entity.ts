import { Collection, EntitySchema, ReferenceKind } from '@mikro-orm/core';
import { CustomerRepository } from './customer.repository.ts';
import { type BaseEntity, BaseEntitySchema } from '../common/base.entity.ts';
import { type IRental } from '../rental/rental.entity.ts';

export interface ICustomer extends BaseEntity {
  name: string;
  surname: string;
  birthdate: Date;
  rentals: Collection<IRental>;
}

export const Customer = new EntitySchema<ICustomer, BaseEntity>({
  name: 'Customer',
  extends: BaseEntitySchema,
  repository: () => CustomerRepository,
  properties: {
    name: { type: 'varchar', length: 255 },
    surname: { type: 'varchar', length: 255 },
    birthdate: { type: 'date' },
    rentals: {
      kind: ReferenceKind.ONE_TO_MANY,
      entity: 'Rental',
      mappedBy: 'customer'
    }
  }
});

import { EntityRepository } from '@mikro-orm/sqlite';
import { ICustomer } from './customer.entity.ts';

export class CustomerRepository extends EntityRepository<ICustomer> {}

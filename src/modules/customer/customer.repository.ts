import { EntityRepository } from '@mikro-orm/mysql';
import { ICustomer } from './customer.entity.ts';

export class CustomerRepository extends EntityRepository<ICustomer> {}

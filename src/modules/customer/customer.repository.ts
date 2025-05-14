import { EntityRepository } from '@mikro-orm/mysql';
import type { ICustomer } from './customer.entity.ts';

export class CustomerRepository extends EntityRepository<ICustomer> {}

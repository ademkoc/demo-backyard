import { MikroORM, RequestContext } from '@mikro-orm/mysql';
import { Car } from '../../modules/car/car.entity.ts';
import { Customer } from '../../modules/customer/customer.entity.ts';

export const orm = await MikroORM.init();

export const carRepository = orm.em.getRepository(Car);
export const customerRepository = orm.em.getRepository(Customer);

export const ormEntityManagerHook =
  (done: (...args: any[]) => unknown) => RequestContext.create(orm.em, done);

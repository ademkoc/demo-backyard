import { type HookHandlerDoneFunction } from 'fastify';
import { EntityManager, EntityRepository, MikroORM, type Options, RequestContext } from '@mikro-orm/mysql';
import { type IRental, Rental } from '../../modules/rental/rental.entity.ts';
import { Customer } from '../../modules/customer/customer.entity.ts';
import { CustomerRepository } from '../../modules/customer/customer.repository.ts';
import { Car } from '../../modules/car/car.entity.ts';
import { CarRepository } from '../../modules/car/car.repository.ts';

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  car: CarRepository;
  customer: CustomerRepository;
  rental: EntityRepository<IRental>;
}

let cache: Services;

export async function initORM (options?: Options): Promise<Services> {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init(options);

  // save to cache before returning
  cache = {
    orm,
    em: orm.em,
    car: orm.em.getRepository(Car),
    customer: orm.em.getRepository(Customer),
    rental: orm.em.getRepository(Rental)
  };

  return cache;
}

export const ormEntityManagerHook =
  (em: EntityManager, done: HookHandlerDoneFunction) => RequestContext.create(em, done);

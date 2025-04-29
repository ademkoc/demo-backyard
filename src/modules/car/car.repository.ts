import { EntityRepository } from '@mikro-orm/mysql';
import type { ICar } from './car.entity.ts';

export class CarRepository extends EntityRepository<ICar> {}

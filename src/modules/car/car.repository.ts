import { EntityRepository } from '@mikro-orm/sqlite';
import { ICar } from './car.entity.ts';

export class CarRepository extends EntityRepository<ICar> {}

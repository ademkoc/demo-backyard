import { EntityRepository } from '@mikro-orm/mysql';
import { ICar } from './car.entity.ts';

export class CarRepository extends EntityRepository<ICar> {}

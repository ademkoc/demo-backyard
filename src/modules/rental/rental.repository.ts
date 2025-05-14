import { EntityRepository } from '@mikro-orm/mysql';
import type { IRental } from './rental.entity.ts';

export class RentalRepository extends EntityRepository<IRental> {}

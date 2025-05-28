import createError from 'http-errors';
import type { EntityManager } from '@mikro-orm/mysql';
import type { CarNewFormBody, Pagination, RentNewFormBody } from '../../api-types.ts';
import { CarRepository } from './car.repository.ts';
import { Car } from './car.entity.ts';
import { Customer } from '../customer/customer.entity.ts';
import { Rental } from '../rental/rental.entity.ts';

export class CarService {
  #em: EntityManager;
  #carRepository: CarRepository;

  constructor (carRepository: CarRepository) {
    this.#carRepository = carRepository;
    this.#em = carRepository.getEntityManager();
  }

  async create (payload: CarNewFormBody) {
    const newCar = this.#carRepository.create(payload);
    await this.#em.flush();
    return newCar;
  }

  getById (id: number) {
    return this.#carRepository.findOne({ id });
  }

  get (pagination: Pagination) {
    return this.#carRepository.findAndCount({}, { limit: pagination.limit, offset: pagination.offset });
  }

  rent (payload: RentNewFormBody) {
    return this.#em.transactional(async (em: EntityManager) => {
      const car = await em.findOneOrFail(Car, { id: payload.car_id });

      if (!car.isAvailable) {
        throw createError(400, `Car #${car.id} isn't available!`, { name: 'CarNotAvailableError', details: payload });
      }

      car.isAvailable = false;

      const customer = await em.findOneOrFail(Customer, { id: payload.customer_id });

      const rental = this.#em.create(Rental, {
        rentDate: new Date(),
        car,
        customer
      });

      await this.#em.flush();

      return rental;
    });
  }
}

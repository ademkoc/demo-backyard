import type { FastifyInstance } from 'fastify';
import { CarRepository } from './car.repository.ts';

interface CreateCarServiceOptions {
  carRepository: CarRepository
}

export function createCarService (fastify: FastifyInstance, options: CreateCarServiceOptions) {
  return new CarService(options.carRepository);
}

export class CarService {
  #carRepository: CarRepository;

  constructor (carRepository: CarRepository) {
    this.#carRepository = carRepository;
  }

  create () {
    return this.#carRepository.create({
      model: '',
      brand: '',
      year: '2000',
      km: '',
      isAvailable: false
    });
  }
}

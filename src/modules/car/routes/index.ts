import type { FastifyPluginCallback } from 'fastify';
import { createCarService } from '../car.service.ts';
import create from './create.ts';
import get from './get.ts';
import list from './list.ts';
import rent from './rent.ts';
import { CarRepository } from '../car.repository.ts';

interface CarModuleOptions {
  carRepository: CarRepository
}

const fn: FastifyPluginCallback<CarModuleOptions> = (fastify, options, done) => {
  const carService = createCarService(fastify, { carRepository: options.carRepository });

  fastify.register(get, { carService });
  fastify.register(list, { carService });
  fastify.register(create, { carService });
  fastify.register(rent, { carService });

  done();
};

export default fn;

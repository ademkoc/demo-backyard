import type { FastifyPluginCallback } from 'fastify';
import { createCarService } from '../car.service.ts';
import { createCarRoute } from './create-car.ts';
import { getCarRoute } from './get-car.ts';
import { listCarRoute } from './list-car.ts';
import { rentCarRoute } from './rent-car.ts';
import { CarRepository } from '../car.repository.ts';

interface CarModuleOptions {
  carRepository: CarRepository
}

const fn: FastifyPluginCallback<CarModuleOptions> = function buildCarModule (fastify, options, done) {
  const carService = createCarService(fastify, { carRepository: options.carRepository });

  createCarRoute(fastify, { carService });
  getCarRoute(fastify, { carService });
  listCarRoute(fastify, { carService });
  rentCarRoute(fastify, { carService });

  done();
};

export default fn;

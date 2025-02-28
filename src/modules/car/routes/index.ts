import type { FastifyPluginCallback } from 'fastify';
import { createCarService } from '../car.service.ts';
import { applyCreateCarRoute } from './create.ts';
import { applyGetCarRoute } from './get.ts';
import { applyListCarRoute } from './list.ts';
import { applyCarRoute } from './rent.ts';
import { CarRepository } from '../car.repository.ts';

interface CarModuleOptions {
  carRepository: CarRepository
}

const fn: FastifyPluginCallback<CarModuleOptions> = function buildCarModule (fastify, options, done) {
  const carService = createCarService(fastify, { carRepository: options.carRepository });

  applyCreateCarRoute(fastify, { carService });
  applyGetCarRoute(fastify, { carService });
  applyListCarRoute(fastify, { carService });
  applyCarRoute(fastify, { carService });

  done();
};

export default fn;

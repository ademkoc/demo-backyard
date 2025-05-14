import type { FastifyPluginCallback } from 'fastify';
import { createCarRoute } from './routes/create-car.ts';
import { getCarRoute } from './routes/get-car.ts';
import { listCarRoute } from './routes/list-car.ts';
import { rentCarRoute } from './routes/rent-car.ts';
import type { CarService } from './car.service.ts';

interface CarModuleOptions {
  carService: CarService
}

const fn: FastifyPluginCallback<CarModuleOptions> = function buildCarModule (fastify, options, done) {
  const { carService } = options;

  createCarRoute(fastify, { carService });
  getCarRoute(fastify, { carService });
  listCarRoute(fastify, { carService });
  rentCarRoute(fastify, { carService });

  done();
};

export default fn;

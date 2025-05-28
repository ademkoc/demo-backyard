import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import { CarService } from './car.service.ts';
import { carRepository } from '../../infrastructure/db/db.ts';
import createCarRoutePlugin from './routes/create-car.ts';
import getCarRoutePlugin from './routes/get-car.ts';
import listCarRoutePlugin from './routes/list-car.ts';
import rentCarRoutePlugin from './routes/rent-car.ts';

const fn: FastifyPluginCallback = function carModulePlugin (app, options, done) {
  app.decorate('carService', new CarService(carRepository));
  app.register(createCarRoutePlugin);
  app.register(getCarRoutePlugin);
  app.register(listCarRoutePlugin);
  app.register(rentCarRoutePlugin);
  done();
};

export default fp(fn, {
  name: 'car-module-plugin',
  encapsulate: true
});

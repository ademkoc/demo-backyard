import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CarService } from '../car.service.ts';

interface GetCarPluginOptions {
  carService: CarService;
}

const fn: FastifyPluginCallback<GetCarPluginOptions> =
  function getCarRoutePlugin (fastify, options, done) {
    fastify.get('/:car_id', function getCar (req, res) {
      res.send('adem:koc');
    });
    done();
  };

export default fp(fn);

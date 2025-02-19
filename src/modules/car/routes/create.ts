import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CarService } from '../car.service.ts';

interface CreateCarPluginOptions {
  carService: CarService;
}

const fn: FastifyPluginCallback<CreateCarPluginOptions> = (fastify, options, done) => {
  fastify.post(
    '/',
    async function (req, res) {}
  );
  done();
};

export default fp(fn);

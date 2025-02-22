import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import type { CarService } from '../car.service.ts';
import { CarNewFormBody } from '../../../api-types.ts';

interface CreateCarPluginOptions {
  carService: CarService;
}

const fn: FastifyPluginCallback<CreateCarPluginOptions> = (fastify, options, done) => {
  fastify.post<{ Body: CarNewFormBody }>(
    '/', {
      schema: {
        body: { $ref: 'https://koc.app/schemas/rentacarserver/customer-new-form.json' }
      }
    },
    async function (req, res) {}
  );
  done();
};

export default fp(fn);

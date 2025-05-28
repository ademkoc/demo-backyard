import Fastify, { type FastifyBaseLogger } from 'fastify';
import carModule from './modules/car/index.ts';
import customerModule from './modules/customer/index.ts';
import healthModule from './modules/healthcheck/routes/health.ts';
import { getLogger } from './infrastructure/logger.ts';
import { orm, ormEntityManagerHook } from './infrastructure/db/db.ts';
import { otelSdk } from './infrastructure/tracing.ts';
import { readSchemas } from './infrastructure/schema-reader.ts';
import { NotFoundError } from '@mikro-orm/core';
import { registerSwagger } from './infrastructure/http/swagger.ts';

export async function createApp () {
  otelSdk.start();

  const app = Fastify({
    loggerInstance: getLogger() as FastifyBaseLogger
    // connectionTimeout: 1000
  });

  await readSchemas(app);

  app.addHook('onRequest', function onRequest (request, reply, done) { ormEntityManagerHook(done); });
  app.addHook('onClose', async function onClose () {
    try {
      await orm.close();
      app.log.debug('MikroORM is terminated.');
    } catch (error) {
      app.log.error('Error terminating MikroORM', error);
    }

    try {
      await otelSdk.shutdown();
      app.log.debug('OpenTelemetry is terminated.');
    } catch (error) {
      app.log.error('Error terminating OpenTelemetry', error);
    }
  });

  registerSwagger(app);
  app.register(healthModule, { prefix: '/healthcheck' });
  app.register(carModule, { prefix: 'v1/cars' });
  app.register(customerModule, { prefix: 'v1/customers' });

  app.setErrorHandler(function (error, request, reply) {
    this.log.error(error);

    if (error instanceof NotFoundError) {
      return reply.status(422).send({
        statusCode: 422,
        message: error.message
      });
    }

    if (error.statusCode) {
      return reply.status(error.statusCode).send({
        statusCode: error.statusCode,
        message: error.message
      });
    }

    reply.status(404).send({
      statusCode: 404,
      message: 'Resource not found!'
    });
  });

  app.ready(() => {
    console.log(app.printRoutes());
  });

  return app;
}

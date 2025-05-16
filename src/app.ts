import Fastify, { type FastifyBaseLogger } from 'fastify';
import carModule from './modules/car/index.ts';
import customerModule from './modules/customer/index.ts';
import healthModule from './modules/healthcheck/routes/health.ts';
import { getLogger } from './infrastructure/logger.ts';
import { initORM, ormEntityManagerHook, type Services } from './infrastructure/db/db.ts';
import { otelSdk } from './infrastructure/tracing.ts';
import { readSchemas } from './infrastructure/schema-reader.ts';
import { CarService } from './modules/car/car.service.ts';
import { CustomerService } from './modules/customer/customer.service.ts';
import { NotFoundError } from '@mikro-orm/core';

declare module 'fastify' {
  interface FastifyInstance {
    db: Services;
  }
}

export async function createApp () {
  otelSdk.start();

  const db = await initORM();

  const carService = new CarService(db.car, db.rental);
  const customerService = new CustomerService(db.customer);

  const app = Fastify({
    loggerInstance: getLogger() as FastifyBaseLogger
    // connectionTimeout: 1000
  });

  app.decorate('db', db);

  await readSchemas(app);

  app.addHook('onRequest', function onRequest (request, reply, done) { ormEntityManagerHook(db.em, done); });
  app.addHook('onClose', async function onClose () {
    try {
      await db.orm.close();
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

  app.register(healthModule, { prefix: '/healthcheck' });
  app.register(carModule, { carService, prefix: 'v1/cars' });
  app.register(customerModule, { customerService, prefix: 'v1/customers' });

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

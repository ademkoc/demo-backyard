import Fastify, { type FastifyBaseLogger } from 'fastify';
import metricsPlugin from 'fastify-metrics';
import carModule from './modules/car/routes/index.ts';
import customerModule from './modules/customer/routes/index.ts';
import healthModule from './modules/healthcheck/routes/index.ts';
import { getLogger } from './infrastructure/logger.ts';
import { initORM, ormEntityManagerHook, type Services } from './infrastructure/db/db.ts';
import { otelSdk } from './infrastructure/tracing.ts';
import { readSchemas } from './infrastructure/schema-reader.ts';

declare module 'fastify' {
  interface FastifyInstance {
    db: Services;
  }
}

export async function createApp () {
  otelSdk.start();

  const db = await initORM();

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

  app.register(metricsPlugin.default, { endpoint: '/metrics', routeMetrics: { enabled: true } });

  app.register(healthModule, { prefix: '/healthcheck' });
  app.register(carModule, { carRepository: db.car, prefix: 'v1/cars' });
  app.register(customerModule, { customerRepository: db.customer, prefix: 'v1/customers' });

  app.ready(() => {
    console.log(app.printRoutes());
  });

  return app;
}

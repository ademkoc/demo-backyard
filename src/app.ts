import Fastify from 'fastify';
import CustomerNewFormBody from '../schemas/customer-new-form.json' with { type: 'json' };
import carModule from './modules/car/routes/index.ts';
import customerModule from './modules/customer/routes/index.ts';
import healthModule from './modules/healthcheck/routes/index.ts';
import { getLogger } from './infrastructure/logger.ts';
import { initORM, ormEntityManagerHook } from './infrastructure/db/db.ts';

export async function createApp () {
  const db = await initORM();

  const app = Fastify({
    loggerInstance: getLogger()
    // connectionTimeout: 1000
  });

  app.addSchema(CustomerNewFormBody);

  app.addHook('onRequest', (request, reply, done) => ormEntityManagerHook(db.em, done));
  app.addHook('onClose', async () => {
    app.log.info('ORM is closing');
    await db.orm.close();
  });

  app.register(healthModule, { prefix: '/healthcheck' });
  app.register(carModule, { carRepository: db.car, prefix: 'v1/cars' });
  app.register(customerModule, { customerRepository: db.customer, prefix: 'v1/customers' });

  app.ready(() => {
    console.log(app.printRoutes());
  });

  return app;
}

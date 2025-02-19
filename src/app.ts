import Fastify from 'fastify';
import CustomerNewFormBody from '../schemas/customer-new-form.json' assert { type: 'json' };
import cars from './modules/car/routes/index.ts';
import customers from './modules/customer/routes/index.ts';
import { initORM, ormEntityManagerHook } from './infrastructure/db/db.ts';

export async function createApp () {
  const db = await initORM();

  const app = Fastify({
    logger: true
  });

  app.addSchema(CustomerNewFormBody);

  app.addHook('onRequest', (request, reply, done) => ormEntityManagerHook(db.em, done));
  app.addHook('onClose', async () => await db.orm.close());

  app.register(cars, { carRepository: db.car, prefix: 'v1/cars' });
  app.register(customers, { customerRepository: db.customer, prefix: 'v1/customers' });

  app.ready(() => {
    console.log(app.printRoutes());
  });

  return app;
}

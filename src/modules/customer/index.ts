import fp from 'fastify-plugin';
import type { FastifyPluginCallback } from 'fastify';
import getCustomerRoutePlugin from './routes/get-customer.ts';
import createCustomerRoutePlugin from './routes/create-customer.ts';
import { customerRepository } from '../../infrastructure/db/db.ts';
import { CustomerService } from './customer.service.ts';

const fn: FastifyPluginCallback = (app, options, done) => {
  app.decorate('customerService', new CustomerService(customerRepository));
  app.register(getCustomerRoutePlugin);
  app.register(createCustomerRoutePlugin);
  done();
};

export default fp(fn, {
  name: 'customer-module-plugin',
  encapsulate: true
});

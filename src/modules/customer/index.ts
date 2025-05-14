import type { FastifyPluginCallback } from 'fastify';
import { CustomerService } from './customer.service.ts';
import { getCustomerRoute } from './routes/get-customer.ts';
import { createCustomerRoute } from './routes/create-customer.ts';

export interface CustomerModuleOptions {
  customerService: CustomerService
}

const fn: FastifyPluginCallback<CustomerModuleOptions> = (fastify, options, done) => {
  const { customerService } = options;

  getCustomerRoute(fastify, { customerService });
  createCustomerRoute(fastify, { customerService });

  done();
};

export default fn;

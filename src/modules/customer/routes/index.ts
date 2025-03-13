import type { FastifyPluginCallback } from 'fastify';
import { createCustomerService } from '../customer.service.ts';
import { getCustomerRoute } from './get-customer.ts';
import { createCustomerRoute } from './create-customer.ts';
import { CustomerRepository } from '../customer.repository.ts';

export interface CustomerModuleOptions {
  customerRepository: CustomerRepository
}

const fn: FastifyPluginCallback<CustomerModuleOptions> = (fastify, options, done) => {
  const customerService = createCustomerService(fastify, {
    customerRepository: options.customerRepository
  });

  getCustomerRoute(fastify, { customerService });
  createCustomerRoute(fastify, { customerService });

  done();
};

export default fn;

import type { FastifyInstance } from 'fastify';
import { CustomerNewFormBody } from '../../api-types.ts';
import { CustomerRepository } from './customer.repository.ts';

interface CreateCustomerServiceOptions {
  customerRepository: CustomerRepository
}

export function createCustomerService (fastify: FastifyInstance, options: CreateCustomerServiceOptions) {
  return new CustomerService(options.customerRepository);
}

export class CustomerService {
  constructor (private readonly customerRepository: CustomerRepository) {}

  async create (payload: CustomerNewFormBody) {
    const newCustomer = this.customerRepository.insert(payload);

    await this.customerRepository.getEntityManager().flush();

    return newCustomer;
  }

  async findById (id: number) {
    const asd = await this.customerRepository.findOneOrFail(id);

    return asd;
  }
}

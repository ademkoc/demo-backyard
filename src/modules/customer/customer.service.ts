import type { FastifyInstance } from 'fastify';
import { Services } from '../../infrastructure/db/db.ts';
import { CustomerNewFormBody } from '../../api-types.ts';

interface CreateCustomerServiceOptions {
  customerRepository: Services['customer']
}

export function createCustomerService (fastify: FastifyInstance, options: CreateCustomerServiceOptions) {
  return new CustomerService(options.customerRepository);
}

export class CustomerService {
  constructor (private readonly customerRepository: Services['customer']) {}

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

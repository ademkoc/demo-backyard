import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import type { FastifyDynamicSwaggerOptions } from '@fastify/swagger';
import type { FastifyInstance } from 'fastify';
import { config } from '../config.ts';

type TagName = 'customer' | 'car';
type TagItem = { name: TagName, description: string };

export const Tags: TagItem[] = [
  { name: 'customer', description: 'Code related end-points' },
  { name: 'car', description: 'Code related end-points' }
];

export const Tag: Record<Uppercase<TagName>, TagName> = {
  CAR: 'car',
  CUSTOMER: 'customer'
};

const swaggerOptions: FastifyDynamicSwaggerOptions = {
  openapi: {
    openapi: '3.1.0',
    info: {
      title: config.serviceName,
      version: config.serviceVersion
    },
    servers: [
      {
        url: `http://localhost:${config.port}`,
        description: 'Development server'
      }
    ],
    tags: Tags,
    components: {
      securitySchemes: {}
    }
  }
};

export function registerSwagger (app: FastifyInstance) {
  app.register(swagger, swaggerOptions);
  app.register(swaggerUi);
}

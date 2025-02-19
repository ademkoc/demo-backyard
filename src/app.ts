import fastUri from 'fast-uri';
import Fastify from 'fastify';
import ajvFormats from 'ajv-formats';
import { Options as AjvOptions, Ajv2019, AnySchema, AnySchemaObject } from 'ajv/dist/2019.js';
import CustomerNewFormBody from '../schemas/customer-new-form.json' assert { type: 'json' };
import cars from './modules/car/routes/index.ts';
import customers from './modules/customer/routes/index.ts';
import { initORM, ormEntityManagerHook } from './infrastructure/db/db.ts';

export async function createApp () {
  const db = await initORM();

  const app = Fastify({
    logger: true,
    ajv: {
      customOptions: {
        coerceTypes: 'array',
        useDefaults: true,
        removeAdditional: true,
        uriResolver: fastUri,
        addUsedSchema: false,
        // Explicitly set allErrors to `false`.
        // When set to `true`, a DoS attack is possible.
        allErrors: false
      },
      plugins: [ajvFormats.default]
    },
    // https://fastify.dev/docs/latest/Reference/Server/#schemacontroller
    schemaController: {
      // @ts-ignore
      bucket: function factory (parentSchemas: { [key: string]: AnySchema | AnySchema[] }) {
        const context = Object.create(null);
        Object.assign(context, parentSchemas);

        return {
          add (inputSchema: AnySchemaObject) {
            if (!inputSchema?.$id) {
              return;
            }

            if (Object.hasOwn(context, inputSchema.$id)) {
              throw new Error(`Schema with id "${inputSchema.$id}" already declared`);
            }

            context[inputSchema.$id] = inputSchema;
          },
          getSchema (schema$id: string) {
            return context[schema$id];
          },
          getSchemas () {
            return context;
          }
        };
      },
      compilersFactory: {
        // @ts-ignore
        buildValidator: function factory (
          externalSchemas: { [key: string]: AnySchema | AnySchema[] },
          ajvServerOption: {
            customOptions?: AjvOptions,
            plugins?: (Function | [Function, unknown])[],
            onCreate?: (ajvInstance: Ajv2019) => void
          }) {
          const ajv2019 = new Ajv2019(ajvServerOption.customOptions);

          return function validatorCompiler ({ schema }: { schema: { $id: string, $ref: string } }) {
            if (schema.$id) {
              const stored = ajv2019.getSchema(schema.$id);
              if (stored) {
                return stored;
              }
            }

            if (schema.$ref) {
              return ajv2019.compile(externalSchemas[schema.$ref]);
            }

            return ajv2019.compile(schema);
          };
        }
      }
    }
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

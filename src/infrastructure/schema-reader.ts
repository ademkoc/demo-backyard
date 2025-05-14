import path from 'node:path';
import { readdir, readFile } from 'node:fs/promises';
import type { FastifyInstance } from 'fastify';

export async function readSchemas (fastify: FastifyInstance) {
  const schemas = [];

  for (const filename of await readdir('./schemas')) {
    if (path.extname(filename) === '.json') {
      schemas.push(filename);
    }
  }

  fastify.log.info(`Found ${schemas.length} schema definition`);

  for (const filename of schemas) {
    const file = await readFile(path.join('./schemas', filename), 'utf8');
    fastify.addSchema(JSON.parse(file));
  }
}

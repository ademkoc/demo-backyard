import path from 'node:path';
import { readdir, readFile } from 'node:fs/promises';
import type { FastifyInstance } from 'fastify';

export async function readSchemas (fastify: FastifyInstance) {
  for (const filename of await readdir('./schemas')) {
    if (path.extname(filename) !== '.json') {
      continue;
    }

    const file = await readFile(path.join('./schemas', filename), 'utf8');

    fastify.addSchema(JSON.parse(file));
  }
}

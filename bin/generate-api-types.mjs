#!/usr/bin/env node
import * as fs from 'fs';
import { compileFromFile } from 'json-schema-to-typescript';

console.log('Generating API types from JSON schemas');
const files = [];
for (const file of fs.readdirSync('./schemas')) {
  if (file.match(/\.json$/)) {
    files.push(file);
  }
}

let out = '';

for (const file of files) {
  console.log(' - ' + file);

  out += await compileFromFile(
    'schemas/' + file,
    {
      ignoreMinAndMaxItems: true,
      unknownAny: true,
      additionalProperties: false
    }
  );
}

fs.writeFileSync('src/api-types.ts', out);

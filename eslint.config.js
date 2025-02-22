'use strict';

import neo from 'neostandard';

export default [
  ...neo({
    ts: true,
    semi: true,
    ignores: ['dist']
  }),
  {
    rules: {
      '@stylistic/comma-dangle': ['error', {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }]
    }
  }
];

import { defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
  clientUrl: process.env.DATABASE_URL,

  entities: ['src/modules/**/*.entity.ts'],

  migrations: {
    tableName: 'migrations',
    path: './migrations',
    snapshot: false,
    transactional: true
  },

  debug: false
});

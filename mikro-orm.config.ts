import { defineConfig } from '@mikro-orm/mysql';

export default defineConfig({
  clientUrl: process.env.DATABASE_URL,

  entities: ['dist/src/modules/**/*.entity.js'],
  entitiesTs: ['src/modules/**/*.entity.ts'],

  migrations: {
    tableName: 'migrations',
    path: './migrations',
    snapshot: false,
    transactional: true
  },

  debug: false,
  preferTs: process.env.MIKRO_ORM_PREFER_TS === 'true'
});

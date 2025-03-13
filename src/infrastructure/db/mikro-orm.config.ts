import { defineConfig } from '@mikro-orm/mysql';
import { getConfig, getDatabaseConfig } from '../config.ts';

const config = getConfig();

// no need to specify the `driver` now, it will be inferred automatically
export default defineConfig({
  clientUrl: getDatabaseConfig().databaseURL,
  // folder-based discovery setup, using common filename suffix
  entities: ['src/modules/**/*.entity.js'],
  entitiesTs: ['src/modules/**/*.entity.ts'],

  migrations: {
    tableName: 'migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    snapshot: false,
    transactional: true
  },

  // enable debug mode to log SQL queries and discovery information
  debug: config.environment !== 'production',
  preferTs: config.environment !== 'production'
});

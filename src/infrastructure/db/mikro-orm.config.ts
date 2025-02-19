import { defineConfig } from '@mikro-orm/sqlite';
import { TSMigrationGenerator } from '@mikro-orm/migrations';
import { format } from 'sql-formatter';

class CustomMigrationGenerator extends TSMigrationGenerator {
  generateMigrationFile (className: string, diff: { up: string[]; down: string[] }): string {
    const comment = '/* eslint-disable */\n\n' + '// This file was generated via custom migration generator\n\n';
    return comment + super.generateMigrationFile(className, diff);
  }

  createStatement (sql: string, padLeft: number): string {
    sql = format(sql, { language: 'sqlite' });
    // a bit of indenting magic
    sql = sql.split('\n').map((l, i) => i === 0 ? l : `${' '.repeat(padLeft + 13)}${l}`).join('\n');

    return super.createStatement(sql, padLeft);
  }
}

// no need to specify the `driver` now, it will be inferred automatically
export default defineConfig({
  dbName: 'sqlite.db',
  // folder-based discovery setup, using common filename suffix
  entities: ['dist/modules/**/*.entity.js'],
  entitiesTs: ['src/modules/**/*.entity.ts'],

  migrations: {
    generator: CustomMigrationGenerator,
    tableName: 'migrations', // name of database table with log of executed transactions
    path: './migrations', // path to the folder with migrations
    snapshot: false,
    transactional: true
  },

  // enable debug mode to log SQL queries and discovery information
  debug: true
});

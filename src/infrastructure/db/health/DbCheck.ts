/*
 * @adonisjs/lucid
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BaseCheck, Result } from '@adonisjs/health';
import { type HealthCheckResult } from '@adonisjs/health/types';
import { EntityManager } from '@mikro-orm/mysql';

/**
 * The DbCheck attempts to establish the database connection by
 * executing a sample query.
 */
export class DbCheck extends BaseCheck {
  #entityManager: EntityManager;

  /**
   * Health check public name
   */
  name: string;

  constructor (client: EntityManager) {
    super();
    this.#entityManager = client;
    this.name = 'Database health check';
  }

  /**
   * Internal method to ping the database server
   */
  async #ping () {
    await this.#entityManager!.execute('SELECT 1 + 1 AS result');
  }

  /**
   * Executes the health check
   */
  async run (): Promise<HealthCheckResult> {
    try {
      await this.#ping();
      return Result.ok('Successfully connected to the database server');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Connection failed';
      return Result.failed(message, error as Error);
    }
  }
}

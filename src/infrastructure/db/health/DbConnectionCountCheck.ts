/*
 * @adonisjs/lucid
 *
 * (c) AdonisJS
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

import { BaseCheck, Result } from '@adonisjs/health';
import { HealthCheckResult } from '@adonisjs/health/types';
import { EntityManager } from '@mikro-orm/mysql';

/**
 * The DbConnectionCountCheck can be used to monitor the active
 * database connections and report a warning or error after
 * a certain threshold has been execeeded.
 */
export class DbConnectionCountCheck extends BaseCheck {
  #entityManager: EntityManager;

  /**
   * Method to compute the memory consumption
   */
  #computeFn: (client: EntityManager) => Promise<number | null> = async (client) => {
    const response = await client.getKnex()
      .select()
      .from('information_schema.PROCESSLIST')
      .count('* as connections');
    return Number(response[0].connections);
  };

  /**
   * Connections count threshold after which a warning will be created
   */
  #warnThreshold: number = 10;

  /**
   * Connections count threshold after which an error will be created
   */
  #failThreshold: number = 15;

  /**
   * Health check public name
   */
  name: string;

  constructor (client: EntityManager) {
    super();
    this.#entityManager = client;
    this.name = 'Connection count health check';
  }

  /**
   * Returns connections count metadata to be shared in the
   * health checks report
   */
  #getConnectionsCountMetadata (active: number) {
    return {
      connectionsCount: {
        active,
        warningThreshold: this.#warnThreshold,
        failureThreshold: this.#failThreshold
      }
    };
  }

  /**
   * Define the connections count threshold after which a
   * warning should be created.
   *
   * ```
   * .warnWhenExceeds(20)
   * ```
   */
  warnWhenExceeds (connectionsCount: number) {
    this.#warnThreshold = connectionsCount;
    return this;
  }

  /**
   * Define the connections count threshold after which an
   * error should be created.
   *
   * ```
   * .failWhenExceeds(30)
   * ```
   */
  failWhenExceeds (connectionsCount: number) {
    this.#failThreshold = connectionsCount;
    return this;
  }

  /**
   * Define a custom callback to compute database connections count.
   * The return value must be a number of active connections
   * or null (if dialect is not supported).
   */
  compute (callback: (client: EntityManager) => Promise<number | null>): this {
    this.#computeFn = callback;
    return this;
  }

  /**
   * Executes the health check
   */
  async run (): Promise<HealthCheckResult> {
    try {
      const connectionsCount = await this.#computeFn(this.#entityManager);
      if (!connectionsCount) {
        return Result.ok(
          'Check skipped. Unable to get active connections'
        );
      }

      /**
       * Check if we have crossed the failure threshold
       */
      if (connectionsCount > this.#failThreshold) {
        return Result.failed(
          `There are ${connectionsCount} active connections, which is above the threshold of ${this.#failThreshold} connections`
        )
          .mergeMetaData(this.#getConnectionsCountMetadata(connectionsCount));
      }

      /**
       * Check if we have crossed the warning threshold
       */
      if (connectionsCount > this.#warnThreshold) {
        return Result.warning(
          `There are ${connectionsCount} active connections, which is above the threshold of ${this.#warnThreshold} connections`
        )
          .mergeMetaData(this.#getConnectionsCountMetadata(connectionsCount));
      }

      return Result.ok(
        `There are ${connectionsCount} active connections, which is under the defined thresholds`
      )
        .mergeMetaData(this.#getConnectionsCountMetadata(connectionsCount));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Connection failed';
      return Result.failed(message, error as Error);
    }
  }
}

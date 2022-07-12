import type {FieldPacket, Pool} from 'mysql2/promise';
import {createPool} from 'mysql2/promise';

import {GlobalVars} from './globalVars';

class DbHelper {
  // functions
  /**
   * Create a pool
   * @param db
   */
  createPool(db = GlobalVars.db) {
    return createPool(db);
  }

  /**
   * Execute an sql query
   * @param query {string} Query to execute
   * @returns {Query}
   */
  async executeQuery(query: string) {
    const connection = this.createPool();
    const results = await connection.execute(query);
    await this.destroyConnection(connection);
    return results;
  }

  /**
   * Get query results
   * @param query {string} Query to execute
   * @returns {Promise<Array<Object>>}
   */
  async getQueryResults(query: string) {
    return (await this.executeQuery(query))[0];
  }

  /**
   * Create a custom 'SELECT' query
   * @param table {string} Name of the table
   * @param fields {string|Array<string>} Fields to add to the request
   * @param conditions {?string} Fields to add to the request
   * @return {string}
   */
  createCustomSelectQuery(
    table: string,
    fields: string | string[] = '*',
    conditions?: string
  ): string {
    const query = (customFields: string) =>
      `SELECT ${customFields} FROM ${table} ${
        !conditions ? '' : `where ${conditions}`
      };`;

    if (typeof fields === 'string') {
      return query(fields);
    }

    return query(fields.join(','));
  }

  /**
   * Execute a custom 'SELECT' query
   * @param table {string} Name of the table
   * @param fields {string|Array<string>} Fields to add to the request
   * @param conditions {?string} Fields to add to the request
   * @return {Promise<Array<Object>>}
   */
  async getResultsCustomSelectQuery(
    table: string,
    fields: string | string[] = '*',
    conditions?: string
  ) {
    return this.getQueryResults(
      this.createCustomSelectQuery(table, fields, conditions)
    );
  }

  /**
   * Get query fields
   * @param query {string} Query to execute
   * @returns {Promise<Array<Object>>}
   */
  async getQueryFields(query: string): Promise<FieldPacket[]> {
    return (await this.executeQuery(query))[1];
  }

  /**
   * Destroy sql connection
   * @return {Promise<void>}
   */
  async destroyConnection(connection: Pool): Promise<void> {
    await connection.end();
  }
}

export const dbHelper = new DbHelper();

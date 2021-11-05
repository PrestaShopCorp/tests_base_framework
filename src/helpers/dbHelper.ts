import type {Pool} from 'mysql2/promise';
import * as mysql from 'mysql2/promise';
import {GlobalVars} from './globalVars';

class DbHelper {
  private connection: Pool;
  constructor() {
    // Create connexion
    this.connection = mysql.createPool(GlobalVars.db);
  }

  // functions
  /**
   * Execute an sql query
   * @param query {string} Query to execute
   * @returns {Query}
   */
  executeQuery(query: string) {
    return this.connection.execute(query);
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
   * @return {Promise<string>}
   */
  async createCustomSelectQuery(
    table: string,
    fields: string|Array<string> = '*',
    conditions?: string,
  ) {
    const query =
      (customFields: string) => `SELECT ${customFields} FROM ${table} ${!conditions ? '' : `where ${conditions}`};`;

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
    fields: string|Array<string> = '*',
    conditions?: string,
  ) {
    return this.getQueryResults(
      await this.createCustomSelectQuery(table, fields, conditions),
    );
  }

  /**
   * Get query fields
   * @param query {string} Query to execute
   * @returns {Promise<Array<Object>>}
   */
  async getQueryFields(query: string) {
    return (await this.executeQuery(query))[1];
  }

  /**
   * Destroy sql connection
   * @return {Promise<void>}
   */
  async destroyConnection(): Promise<void> {
    await this.connection.end();
  }
}
const dbHelper = new DbHelper();
export {dbHelper};

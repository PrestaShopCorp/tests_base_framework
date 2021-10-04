require('module-alias/register');
require('@utils/globals');

const mysql = require('mysql2/promise');

class DbHelper {
  constructor() {
    // Create connexion
    this.connection = mysql.createPool({
      host: global.DB.HOST,
      user: global.DB.USER,
      password: global.DB.PASSWORD,
      database: global.DB.NAME,
    });
  }

  // functions

  /**
   * Execute an sql query
   * @param query {String} Query to execute
   * @returns {Query}
   */
  executeQuery(query) {
    return this.connection.execute(query);
  }

  /**
   * Get query results
   * @param query {String} Query to execute
   * @returns {Promise<Array<Object>>}
   */
  async getQueryResults(query) {
    return (await this.executeQuery(query))[0];
  }

  /**
   * Create a custom 'SELECT' query
   * @param table {string} Name of the table
   * @param fields {string|Array<string>} Fields to add to the request
   * @return {Promise<string>}
   */
  async createCustomSelectQuery(table, fields = '*') {
    const query = customFields => `SELECT ${customFields} FROM ${table};`;

    if (typeof fields === 'string') {
      return query(fields);
    }

    return query(fields.join(','));
  }

  /**
   * Execute a custom 'SELECT' query
   * @param table {string} Name of the table
   * @param fields {string|Array<string>} Fields to add to the request
   * @return {Promise<Array<Object>>}
   */
  async getResultsCustomSelectQuery(table, fields = '*') {
    return this.getQueryResults(await this.createCustomSelectQuery(table, fields));
  }


  /**
   * Get query fields
   * @param query {String} Query to execute
   * @returns {Promise<Array<Object>>}
   */
  async getQueryFields(query) {
    return (await this.executeQuery(query))[1];
  }


  /**
   * Destroy sql connection
   * @return {Promise<void>}
   */
  async destroyConnection() {
    await this.connection.end();
  }
}

module.exports = new DbHelper();

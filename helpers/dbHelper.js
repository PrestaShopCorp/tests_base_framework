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
   * Get query fields
   * @param query {String} Query to execute
   * @returns {Promise<Array<Object>>}
   */
  async getQueryFields(query) {
    return (await this.executeQuery(query))[1];
  }


  async destroyConnection() {
    await this.connection.end();
  }
}

module.exports = new DbHelper();

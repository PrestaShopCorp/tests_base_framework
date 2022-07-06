import type { Pool } from 'mysql2/promise';
import * as mysql from 'mysql2/promise';
declare class DbHelper {
    /**
     * Create a pool
     * @param db
     */
    createPool(db?: {
        host: string;
        user: string;
        password: string;
        database: string;
    }): Pool;
    /**
     * Execute an sql query
     * @param query {string} Query to execute
     * @returns {Query}
     */
    executeQuery(query: string): Promise<[mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket | mysql.OkPacket[] | mysql.ResultSetHeader, mysql.FieldPacket[]]>;
    /**
     * Get query results
     * @param query {string} Query to execute
     * @returns {Promise<Array<Object>>}
     */
    getQueryResults(query: string): Promise<mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket | mysql.OkPacket[] | mysql.ResultSetHeader>;
    /**
     * Create a custom 'SELECT' query
     * @param table {string} Name of the table
     * @param fields {string|Array<string>} Fields to add to the request
     * @param conditions {?string} Fields to add to the request
     * @return {string}
     */
    createCustomSelectQuery(table: string, fields?: string | Array<string>, conditions?: string): string;
    /**
     * Execute a custom 'SELECT' query
     * @param table {string} Name of the table
     * @param fields {string|Array<string>} Fields to add to the request
     * @param conditions {?string} Fields to add to the request
     * @return {Promise<Array<Object>>}
     */
    getResultsCustomSelectQuery(table: string, fields?: string | Array<string>, conditions?: string): Promise<mysql.RowDataPacket[] | mysql.RowDataPacket[][] | mysql.OkPacket | mysql.OkPacket[] | mysql.ResultSetHeader>;
    /**
     * Get query fields
     * @param query {string} Query to execute
     * @returns {Promise<Array<Object>>}
     */
    getQueryFields(query: string): Promise<mysql.FieldPacket[]>;
    /**
     * Destroy sql connection
     * @return {Promise<void>}
     */
    destroyConnection(connection: Pool): Promise<void>;
}
declare const dbHelper: DbHelper;
export { dbHelper };

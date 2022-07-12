"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbHelper = void 0;
const promise_1 = require("mysql2/promise");
const globalVars_1 = require("./globalVars");
class DbHelper {
    // functions
    /**
     * Create a pool
     * @param db
     */
    createPool(db = globalVars_1.GlobalVars.db) {
        return (0, promise_1.createPool)(db);
    }
    /**
     * Execute an sql query
     * @param query {string} Query to execute
     * @returns {Query}
     */
    executeQuery(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = this.createPool();
            const results = yield connection.execute(query);
            yield this.destroyConnection(connection);
            return results;
        });
    }
    /**
     * Get query results
     * @param query {string} Query to execute
     * @returns {Promise<Array<Object>>}
     */
    getQueryResults(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.executeQuery(query))[0];
        });
    }
    /**
     * Create a custom 'SELECT' query
     * @param table {string} Name of the table
     * @param fields {string|Array<string>} Fields to add to the request
     * @param conditions {?string} Fields to add to the request
     * @return {string}
     */
    createCustomSelectQuery(table, fields = '*', conditions) {
        const query = (customFields) => `SELECT ${customFields} FROM ${table} ${!conditions ? '' : `where ${conditions}`};`;
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
    getResultsCustomSelectQuery(table, fields = '*', conditions) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getQueryResults(this.createCustomSelectQuery(table, fields, conditions));
        });
    }
    /**
     * Get query fields
     * @param query {string} Query to execute
     * @returns {Promise<Array<Object>>}
     */
    getQueryFields(query) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.executeQuery(query))[1];
        });
    }
    /**
     * Destroy sql connection
     * @return {Promise<void>}
     */
    destroyConnection(connection) {
        return __awaiter(this, void 0, void 0, function* () {
            yield connection.end();
        });
    }
}
exports.dbHelper = new DbHelper();

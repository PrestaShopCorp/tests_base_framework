"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mochaHooks = exports.CommonPage = exports.browserHelper = exports.deleteRoute = exports.addRoute = exports.addInitScript = exports.getTab = exports.closeTab = exports.addTab = exports.getBrowserContext = exports.closeContext = exports.createContext = exports.closeBrowser = exports.createBrowser = exports.dbHelper = exports.GlobalVars = void 0;
// Export helpers
/* Export GlobalVars */
var globalVars_1 = require("./helpers/globalVars");
Object.defineProperty(exports, "GlobalVars", { enumerable: true, get: function () { return globalVars_1.GlobalVars; } });
/* Export Db helper */
var dbHelper_1 = require("./helpers/dbHelper");
Object.defineProperty(exports, "dbHelper", { enumerable: true, get: function () { return dbHelper_1.dbHelper; } });
/* Export Browser helper */
var browserHelper_1 = require("./helpers/browserHelper");
Object.defineProperty(exports, "createBrowser", { enumerable: true, get: function () { return browserHelper_1.createBrowser; } });
Object.defineProperty(exports, "closeBrowser", { enumerable: true, get: function () { return browserHelper_1.closeBrowser; } });
Object.defineProperty(exports, "createContext", { enumerable: true, get: function () { return browserHelper_1.createContext; } });
Object.defineProperty(exports, "closeContext", { enumerable: true, get: function () { return browserHelper_1.closeContext; } });
Object.defineProperty(exports, "getBrowserContext", { enumerable: true, get: function () { return browserHelper_1.getBrowserContext; } });
Object.defineProperty(exports, "addTab", { enumerable: true, get: function () { return browserHelper_1.addTab; } });
Object.defineProperty(exports, "closeTab", { enumerable: true, get: function () { return browserHelper_1.closeTab; } });
Object.defineProperty(exports, "getTab", { enumerable: true, get: function () { return browserHelper_1.getTab; } });
Object.defineProperty(exports, "addInitScript", { enumerable: true, get: function () { return browserHelper_1.addInitScript; } });
Object.defineProperty(exports, "addRoute", { enumerable: true, get: function () { return browserHelper_1.addRoute; } });
Object.defineProperty(exports, "deleteRoute", { enumerable: true, get: function () { return browserHelper_1.deleteRoute; } });
exports.browserHelper = __importStar(require("./helpers/browserHelper"));
// Export utils
/* Export Common page */
var commonPage_1 = require("./utils/pages/commonPage");
Object.defineProperty(exports, "CommonPage", { enumerable: true, get: function () { return commonPage_1.CommonPage; } });
/* Export Mocha hooks */
var setup_1 = require("./utils/mocha/setup");
Object.defineProperty(exports, "mochaHooks", { enumerable: true, get: function () { return setup_1.mochaHooks; } });

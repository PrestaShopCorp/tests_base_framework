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
exports.browserHelper = exports.deleteRoute = exports.addRoute = exports.addInitScript = exports.getTab = exports.closeTab = exports.addTab = exports.getBrowserContext = exports.closeContext = exports.createContext = exports.closeBrowser = exports.createBrowser = void 0;
const playwright_1 = require("playwright");
const globalVars_1 = require("./globalVars");
const playwright = { chromium: playwright_1.chromium, firefox: playwright_1.firefox, webkit: playwright_1.webkit };
/* Browser functions*/
/**
 * Create browser with options
 * @returns {Promise<Browser|null>}
 */
function createBrowser() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get browser options
        const browserOptions = globalVars_1.GlobalVars.getBrowserOptions();
        let attempt = 1;
        // Sometimes, the browser crash in creation
        // Trying to create the browser for 3 times
        while (attempt <= 3) {
            try {
                return yield playwright[globalVars_1.GlobalVars.browser.name].launch(browserOptions);
            }
            catch (e) {
                if (attempt === 3) {
                    throw new Error(e.message);
                }
                else {
                    yield new Promise((resolve) => setTimeout(resolve, 5000));
                    attempt += 1;
                }
            }
        }
        return null;
    });
}
exports.createBrowser = createBrowser;
/**
 * Close the browser
 * @param browser {Browser} Browser launched for tests
 * @returns {Promise<void>}
 */
function closeBrowser(browser) {
    return __awaiter(this, void 0, void 0, function* () {
        yield browser.close();
    });
}
exports.closeBrowser = closeBrowser;
/* Context functions */
/**
 * Create browser context with viewport and language
 * @param browser {Browser} Browser created with function above
 * @returns {Promise<BrowserContext>}
 */
function createContext(browser) {
    return __awaiter(this, void 0, void 0, function* () {
        const contextOptions = globalVars_1.GlobalVars.getBrowserContextOptions();
        return browser.newContext(contextOptions);
    });
}
exports.createContext = createContext;
/**
 * Close browser context
 * @param context {BrowserContext} Browser context created above
 * @returns {Promise<void>}
 */
function closeContext(context) {
    return __awaiter(this, void 0, void 0, function* () {
        yield context.close();
    });
}
exports.closeContext = closeContext;
/**
 * Get browser context by position
 * @param browser {Browser} Browser launched for tests
 * @param position {number} Position of the context (-1 for the last context)
 * @returns {BrowserContext}
 */
function getBrowserContext(browser, position = -1) {
    const contexts = browser.contexts();
    if (contexts.length === 0) {
        throw new Error('0 Context was found for this browser');
    }
    else if (position < -1 || position >= contexts.length) {
        throw new Error(`Position ${position} is wrong to get the context`);
    }
    else if (position === -1) {
        return contexts[contexts.length - 1];
    }
    return contexts[position];
}
exports.getBrowserContext = getBrowserContext;
/* Tab functions */
/**
 * Add new tab on the browser
 * @param context {BrowserContext} Browser context created above
 * @returns {Promise<Page>}
 */
function addTab(context) {
    return __awaiter(this, void 0, void 0, function* () {
        return context.newPage();
    });
}
exports.addTab = addTab;
/**
 * Close browser tab
 * @param tab {Page} Browser tab created above
 * @returns {Promise<void>}
 */
function closeTab(tab) {
    return __awaiter(this, void 0, void 0, function* () {
        yield tab.close();
    });
}
exports.closeTab = closeTab;
/**
 * Get Browser tab from position
 * @param context {BrowserContext} Context to get tab from
 * @param position {number} Position of the tab (-1 for last tab)
 * @returns {Page}
 */
function getTab(context, position = -1) {
    const tabs = context.pages();
    if (tabs.length === 0) {
        throw new Error('0 Page was found for this context');
    }
    else if (position < -1 || position >= tabs.length) {
        throw new Error(`Position ${position} is wrong to get the browser tab`);
    }
    else if (position === -1) {
        return tabs[tabs.length - 1];
    }
    return tabs[position];
}
exports.getTab = getTab;
/* Routes functions */
/**
 * Add route to the browser tab or to the browser context
 * @param browserElement {Page|BrowserContext}
 * @param url {string|RegExp|function(URL):boolean}
 * @param handler {function(Route, Request)}
 * @return {Promise<void>}
 */
function addRoute(browserElement, url, handler) {
    return __awaiter(this, void 0, void 0, function* () {
        yield browserElement.route(url, handler);
    });
}
exports.addRoute = addRoute;
/**
 * Delete route to the browser tab or to the browser context
 * @param browserElement {Page|BrowserContext}
 * @param url {string|RegExp|function(URL):boolean}
 * @param handler {function(Route, Request)}
 * @return {Promise<void>}
 */
function deleteRoute(browserElement, url, handler) {
    return __awaiter(this, void 0, void 0, function* () {
        yield browserElement.unroute(url, handler);
    });
}
exports.deleteRoute = deleteRoute;
/**
 * Add init script to the browser tab or to the browser context
 * @param browserElement {Page|BrowserContext}
 * @param script {Function|string|{path: ?string, content: ?string}}
 * @param args {never}
 * @return {Promise<void>}
 */
function addInitScript(browserElement, script, args) {
    return __awaiter(this, void 0, void 0, function* () {
        yield browserElement.addInitScript(script, args);
    });
}
exports.addInitScript = addInitScript;
exports.browserHelper = __importStar(require("./browserHelper"));

import type { Browser, BrowserContext, Page, Route, Request } from 'playwright';
/**
 * Create browser with options
 * @returns {Promise<Browser|null>}
 */
declare function createBrowser(): Promise<Browser | null>;
/**
 * Close the browser
 * @param browser {Browser} Browser launched for tests
 * @returns {Promise<void>}
 */
declare function closeBrowser(browser: Browser): Promise<void>;
/**
 * Create browser context with viewport and language
 * @param browser {Browser} Browser created with function above
 * @returns {Promise<BrowserContext>}
 */
declare function createContext(browser: Browser): Promise<BrowserContext>;
/**
 * Close browser context
 * @param context {BrowserContext} Browser context created above
 * @returns {Promise<void>}
 */
declare function closeContext(context: BrowserContext): Promise<void>;
/**
 * Get browser context by position
 * @param browser {Browser} Browser launched for tests
 * @param position {number} Position of the context (-1 for the last context)
 * @returns {BrowserContext}
 */
declare function getBrowserContext(browser: Browser, position?: number): BrowserContext;
/**
 * Add new tab on the browser
 * @param context {BrowserContext} Browser context created above
 * @returns {Promise<Page>}
 */
declare function addTab(context: BrowserContext): Promise<Page>;
/**
 * Close browser tab
 * @param tab {Page} Browser tab created above
 * @returns {Promise<void>}
 */
declare function closeTab(tab: Page): Promise<void>;
/**
 * Get Browser tab from position
 * @param context {BrowserContext} Context to get tab from
 * @param position {number} Position of the tab (-1 for last tab)
 * @returns {Page}
 */
declare function getTab(context: BrowserContext, position?: number): Page;
/**
 * Add route to the browser tab or to the browser context
 * @param browserElement {Page|BrowserContext}
 * @param url {string|RegExp|function(URL):boolean}
 * @param handler {function(Route, Request)}
 * @return {Promise<void>}
 */
declare function addRoute(browserElement: Page | BrowserContext, url: string | RegExp | ((url: URL) => boolean), handler: (route: Route, request: Request) => void): Promise<void>;
/**
 * Delete route to the browser tab or to the browser context
 * @param browserElement {Page|BrowserContext}
 * @param url {string|RegExp|function(URL):boolean}
 * @param handler {function(Route, Request)}
 * @return {Promise<void>}
 */
declare function deleteRoute(browserElement: Page | BrowserContext, url: string | RegExp | ((url: URL) => boolean), handler: (route: Route, request: Request) => void): Promise<void>;
/**
 * Add init script to the browser tab or to the browser context
 * @param browserElement {Page|BrowserContext}
 * @param script {Function|string|{path: ?string, content: ?string}}
 * @param args {never}
 * @return {Promise<void>}
 */
declare function addInitScript(browserElement: Page | BrowserContext, script: Function | string | {
    path?: string;
    content?: string;
}, args?: never): Promise<void>;
export { createBrowser, closeBrowser, createContext, closeContext, getBrowserContext, addTab, closeTab, getTab, addInitScript, addRoute, deleteRoute };
export * as browserHelper from './browserHelper';

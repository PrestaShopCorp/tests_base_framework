import type {Browser, BrowserContext, Page, Route, Request} from 'playwright';

import * as playwright from 'playwright';
import {GlobalVars} from './globalVars';

/* Browser functions*/
/**
 * Create browser with options
 * @returns {Promise<Browser|null>}
 */
async function createBrowser(): Promise<Browser | null> {
  // Get browser options
  const browserOptions = GlobalVars.getBrowserOptions();

  let attempt = 1;
  // Sometimes, the browser crash in creation
  // Trying to create the browser for 3 times
  while (attempt <= 3) {
    try {
      return await playwright[GlobalVars.browser.name].launch(browserOptions);
    } catch (e) {
      if (attempt === 3) {
        throw new Error((e as Error).message);
      } else {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        attempt += 1;
      }
    }
  }

  return null;
}

/**
 * Close the browser
 * @param browser {Browser} Browser launched for tests
 * @returns {Promise<void>}
 */
async function closeBrowser(browser: Browser): Promise<void> {
  await browser.close();
}

/* Context functions */

/**
 * Create browser context with viewport and language
 * @param browser {Browser} Browser created with function above
 * @returns {Promise<BrowserContext>}
 */
async function createContext(browser: Browser): Promise<BrowserContext> {
  const contextOptions = GlobalVars.getBrowserContextOptions();

  return browser.newContext(contextOptions);
}

/**
 * Close browser context
 * @param context {BrowserContext} Browser context created above
 * @returns {Promise<void>}
 */
async function closeContext(context: BrowserContext): Promise<void> {
  await context.close();
}

/**
 * Get browser context by position
 * @param browser {Browser} Browser launched for tests
 * @param position {number} Position of the context (-1 for the last context)
 * @returns {BrowserContext}
 */
function getBrowserContext(browser: Browser, position = -1): BrowserContext {
  const contexts = browser.contexts();
  if (contexts.length === 0) {
    throw new Error('0 Context was found for this browser');
  } else if (position < -1 || position >= contexts.length) {
    throw new Error(`Position ${position} is wrong to get the context`);
  } else if (position === -1) {
    return contexts[contexts.length - 1];
  }

  return contexts[position];
}

/* Tab functions */

/**
 * Add new tab on the browser
 * @param context {BrowserContext} Browser context created above
 * @returns {Promise<Page>}
 */
async function addTab(context: BrowserContext): Promise<Page> {
  return context.newPage();
}

/**
 * Close browser tab
 * @param tab {Page} Browser tab created above
 * @returns {Promise<void>}
 */
async function closeTab(tab: Page): Promise<void> {
  await tab.close();
}

/**
 * Get Browser tab from position
 * @param context {BrowserContext} Context to get tab from
 * @param position {number} Position of the tab (-1 for last tab)
 * @returns {Page}
 */
function getTab(context: BrowserContext, position = -1): Page {
  const tabs = context.pages();
  if (tabs.length === 0) {
    throw new Error('0 Page was found for this context');
  } else if (position < -1 || position >= tabs.length) {
    throw new Error(`Position ${position} is wrong to get the browser tab`);
  } else if (position === -1) {
    return tabs[tabs.length - 1];
  }

  return tabs[position];
}

/* Routes functions */

/**
 * Add route to the browser tab or to the browser context
 * @param browserElement {Page|BrowserContext}
 * @param url {string|RegExp|function(URL):boolean}
 * @param handler {function(Route, Request)}
 * @return {Promise<void>}
 */
async function addRoute(
  browserElement: Page | BrowserContext,
  url: string | RegExp | ((url: URL) => boolean),
  handler: (route: Route, request: Request) => void
): Promise<void> {
  await browserElement.route(url, handler);
}

/**
 * Delete route to the browser tab or to the browser context
 * @param browserElement {Page|BrowserContext}
 * @param url {string|RegExp|function(URL):boolean}
 * @param handler {function(Route, Request)}
 * @return {Promise<void>}
 */
async function deleteRoute(
  browserElement: Page | BrowserContext,
  url: string | RegExp | ((url: URL) => boolean),
  handler: (route: Route, request: Request) => void
): Promise<void> {
  await browserElement.unroute(url, handler);
}

/**
 * Add init script to the browser tab or to the browser context
 * @param browserElement {Page|BrowserContext}
 * @param script {Function|string|{path: ?string, content: ?string}}
 * @param args {never}
 * @return {Promise<void>}
 */
async function addInitScript(
  browserElement: Page | BrowserContext,
  script: Function | string | {path?: string; content?: string},
  args?: never
): Promise<void> {
  await browserElement.addInitScript(script, args);
}

export {
  createBrowser,
  closeBrowser,
  createContext,
  closeContext,
  getBrowserContext,
  addTab,
  closeTab,
  getTab,
  addInitScript,
  addRoute,
  deleteRoute
};

export * as browserHelper from './browserHelper';

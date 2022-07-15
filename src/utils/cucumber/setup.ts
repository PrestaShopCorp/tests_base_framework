import type {Browser, BrowserContext} from 'playwright';
import {BeforeAll, Before, After, AfterAll} from '@cucumber/cucumber';

import {
  createBrowser,
  createContext,
  addTab,
  closeContext,
  closeBrowser
} from '../../helpers/browserHelper';

let browser: Browser | null;

/**
 * Create unique browser for all mocha run
 */
BeforeAll(async () => {
  // Add browser to mocha context so we can access it from all files
  browser = await createBrowser();
});

/**
 * Create context and add tan
 */
Before(async function () {
  this.browser = browser;
  this.browserContext = await createContext(this.browser as Browser);
  this.browserTab = await addTab(this.browserContext as BrowserContext);
});

/**
 * Destroy context when test is finished
 * Tabs are destroyed with the context
 */
After(async function () {
  await closeContext(this.browserContext as BrowserContext);
});

/**
 * Close browser after finish the run
 */
AfterAll(async function () {
  await closeBrowser(browser!);
});

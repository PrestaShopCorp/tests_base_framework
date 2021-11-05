import type {Browser} from 'playwright';

import {
  BeforeAll, Before, After, AfterAll,
} from '@cucumber/cucumber';

import * as browserHelper from '../../helpers/browserHelper';

let browser: Browser|null;

/**
 * Create unique browser for all mocha run
 */
BeforeAll(async () => {
  // Add browser to mocha context so we can access it from all files
  browser = await browserHelper.createBrowser();
});

/**
 * Create context and add tan
 */
Before(async function () {
  this.browser = browser;
  this.browserContext = await browserHelper.createContext(this.browser);
  this.browserTab = await browserHelper.addTab(this.browserContext);
});

/**
 * Destroy context when test is finished
 * Tabs are destroyed with the context
 */
After(async function () {
  await browserHelper.closeContext(this.browserContext);
});

/**
 * Close browser after finish the run
 */
AfterAll(async function () {
  await browserHelper.closeBrowser(browser!);
});

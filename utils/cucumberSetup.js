require('module-alias/register');

// Import cucumber hooks
const {
  BeforeAll, Before, After, AfterAll,
} = require('@cucumber/cucumber');

// Import browser helper
const browserHelper = require('@helpers/browserHelper');

/**
 * Create unique browser for all mocha run
 */
BeforeAll(async () => {
  // Add browser to mocha context so we can access it from all files
  global.browser = await browserHelper.createBrowser();
});

/**
 * Create context and add tan
 */
Before(async function () {
  this.browser = global.browser;
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
AfterAll(async () => {
  await browserHelper.closeBrowser(global.browser);
});

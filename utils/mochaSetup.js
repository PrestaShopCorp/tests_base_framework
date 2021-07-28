require('module-alias/register');

const helper = require('../helpers/browserHelper');

/**
 * Create unique browser for all mocha run
 */
before(async function () {
  // Add browser to mocha context so we can access it from all files
  this.browser = await helper.createBrowser();
});

/**
 * Close browser after finish the run
 */
after(async function () {
  await helper.closeBrowser(this.browser);
});

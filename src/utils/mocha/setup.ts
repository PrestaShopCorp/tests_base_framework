import {createBrowser, closeBrowser} from '../../helpers/browserHelper';

/**
 * Create unique browser for all mocha run
 */
before(async function () {
  // Add browser to mocha context so we can access it from all files
  this.browser = await createBrowser();
});

/**
 * Close browser after finish the run
 */
after(async function () {
  await closeBrowser(this.browser);
});

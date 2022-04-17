import {createBrowser, closeBrowser, getBrowserContext, getTab} from '../../helpers/browserHelper';
import {GlobalVars} from '../../helpers/globalVars';
let failPosition = 1;

export const mochaHooks = {
  /**
   * Create unique browser for all mocha run
   */
  beforeAll: async function() {
    this.browser = await createBrowser();
  },
  /**
   * Take screenshot after fail
   */
  afterEach: async function() {
    if (GlobalVars.screenshots.active && this.currentTest.state === 'failed') {
      // Get last context used
      const context= await getBrowserContext(this.browser);
      // Get last used tab
      const page  = await getTab(context);
      await page.screenshot(
        {
          path: `${GlobalVars.screenshots.folder}/${failPosition}.png`,
          fullPage: true,
        },
      );
      failPosition++;
    }
  },
  /**
   * Close browser after finish the run
   */
  afterAll: async function() {
    await closeBrowser(this.browser);
  }
}
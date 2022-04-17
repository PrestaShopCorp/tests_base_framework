import {createBrowser, closeBrowser, getBrowserContext, getTab} from '../../helpers/browserHelper';
let failPosition = 1;
const screenshotsFolder = process.env.SCREENSHOTS_FOLDERS = './screenshots';

export const mochaHooks = {
  /**
   * Create unique browser for all mocha run
   */
  beforeAll: async function() {
    this.browser = await createBrowser();
  },
  afterEach: async function() {
    // Get last context used
    const context= await getBrowserContext(this.browser);
    // Get last used tab
    const page  = await getTab(context);
    await page.screenshot(
      {
        path: `${screenshotsFolder}/${failPosition}.png`,
        fullPage: true,
      },
    );
    failPosition++;
  },
  /**
   * Close browser after finish the run
   */
  afterAll: async function() {
    await closeBrowser(this.browser);
  }
}
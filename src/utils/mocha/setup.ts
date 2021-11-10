import {createBrowser, closeBrowser} from '../../helpers/browserHelper';

export const mochaHooks = {
  /**
   * Create unique browser for all mocha run
   */
  beforeAll: async function() {
    this.browser = await createBrowser();
  },
  /**
   * Close browser after finish the run
   */
  afterAll: async function() {
    await closeBrowser(this.browser);
  }
}
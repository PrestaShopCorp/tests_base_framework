import type {Context} from 'mocha';
import type {Browser} from 'playwright';

import {GlobalVars} from '../../helpers/globalVars';

import {
  createBrowser,
  closeBrowser,
  getBrowserContext,
  getTab
} from '../../helpers/browserHelper';

let failPosition = 1;

export const mochaHooks = {
  /**
   * Create unique browser for all mocha run
   */
  beforeAll: async function (): Promise<void> {
    (this as Context).browser = await createBrowser();
  },
  /**
   * Take screenshot after fail
   */
  afterEach: async function (): Promise<void> {
    if (
      GlobalVars.screenshots.active &&
      (this as Context).currentTest?.state === 'failed'
    ) {
      // Get last context used
      const context = getBrowserContext((this as Context).browser as Browser);
      // Get last used tab
      const page = getTab(context);
      await page.screenshot({
        path: `${GlobalVars.screenshots.folder}/${failPosition}.png`,
        fullPage: true
      });
      failPosition++;
    }
  },
  /**
   * Close browser after finish the run
   */
  afterAll: async function (): Promise<void> {
    await closeBrowser((this as Context).browser as Browser);
  }
};

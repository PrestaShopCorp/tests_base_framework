require('../globals');

const playwright = require('playwright');

module.exports = {
  /**
   * Get browser option knowing the platform and browser name
   * @returns {JSON}
   */
  getBrowserOptions() {
    let browserOptions;

    // Get browser options
    if (global.platform === 'desktop') {
      switch (global.browser.name) {
        case 'chromium':
          browserOptions = global.chromiumBrowser.options;
          break;

        case 'firefox':
        case 'webkit':
          browserOptions = global.browser.options;
          break;

        default:
          throw new Error(`The framework can't handle the browser ${global.browser.name}`);
      }
    } else if (global.platform === 'mobile') {
      browserOptions = global.chromiumBrowser.options;
    } else {
      throw new Error(`The framework can't handle the platform ${global.platform}`);
    }

    return browserOptions;
  },

  /**
   * Create browser with options
   * @returns {Promise<Browser>}
   */
  async createBrowser() {
    // Get browser options
    const browserOptions = await this.getBrowserOptions();

    let attempt = 1;
    // Sometimes, the browser crash in creation
    // Trying to create the browser for 3 times
    while (attempt <= 3) {
      try {
        return (await playwright[global.browser.name].launch(browserOptions));
      } catch (e) {
        if (attempt === 3) {
          throw new Error(e);
        } else {
          await (new Promise(resolve => setTimeout(resolve, 5000)));
          attempt += 1;
        }
      }
    }

    return null;
  },

  /**
   * Close the browser
   * @param {Browser} browser Browser launched for tests
   * @returns {Promise<void>}
   */
  async closeBrowser(browser) {
    await browser.close();
  },

  /**
   * Create browser context with viewport and language
   * @param {Browser} browser Browser created with function above
   * @returns {Promise<BrowserContext>}
   */
  async createContext(browser) {
    let contextOptions = global.browserContext.options;

    if (global.platform === 'mobile') {
      const device = playwright.devices[global.device.name];

      contextOptions = {
        ...contextOptions,
        ...device,
      };
    }

    return browser.newContext(contextOptions);
  },

  /**
   * Close browser context
   * @param {BrowserContext} context Browser context created above
   * @returns {Promise<void>}
   */
  async closeContext(context) {
    await context.close();
  },

  /**
   * Add new tab on the browser
   * @param {BrowserContext} context Browser context created above
   * @returns {Promise<Page>}
   */
  addTab(context) {
    return context.newPage();
  },

  /**
   * Close browser tab
   * @param {Page} tab Browser tab created above
   * @returns {Promise<void>}
   */
  async closeTab(tab) {
    await tab.close();
  },
};

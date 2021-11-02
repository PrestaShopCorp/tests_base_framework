import * as playwright from 'playwright';
import {
  myBrowserConfig,
  myBrowserOptions,
  myContextConfig,
  myContextOption,
  myDbConfig,
  myDeviceConfig
} from '@root/types/browserType.d';

export abstract class GlobalVars {
  private static browsersList = ['chromium', 'firefox', 'webkit'];
  private static platformsList = ['desktop', 'mobile'];

  /* Browser vars and functions */
  public static platform = process.env.PLATFORM || 'desktop';

  public static browser: myBrowserConfig = {
    name: process.env.BROWSER || 'chromium',

    // Define browser options
    options: {
      headless: JSON.parse(process.env.HEADLESS || 'true'),
      timeout: 0,
      slowMo: parseInt(process.env.SLOW_MO || '5', 10),
      acceptDownloads: JSON.parse(process.env.ACCEPT_DOWNLOADS || 'true'),
      args: [] as string[],
    },
  };

  /**
   * Get browser options
   */
  public static getBrowserOptions(): myBrowserOptions {
    if (this.platformsList.indexOf(this.platform) === -1) {
      throw new Error(`The framework can't handle the platform ${this.platform}`)
    }

    if (this.browsersList.indexOf(this.browser.name) === -1) {
      throw new Error(`The framework can't handle the browser ${this.browser.name}`);
    }

    const browserOptions = this.browser.options;

    if (this.platform === 'mobile' || this.browser.name === 'chromium') {
    this.browser.options.chromiumSandbox = false;
    this.browser.options.args.push('--disable-web-security');
    }

    return browserOptions;
  }

  /* Browser context vars and functions */
  public static browserContext: myContextConfig = {
    options: {
      viewport: {
        width: parseInt(process.env.WIDTH || '1680', 10),
        height: parseInt(process.env.HEIGHT || '900', 10),
      },
      locale: process.env.LOCALE || 'fr-FR',
    },
  };

  public static device: myDeviceConfig = {
    name: process.env.DEVICE,
  };

  /**
   * Get Browser context options
   */
  public static getBrowserContextOptions(): myContextOption {
    let contextOptions = this.browserContext.options;

    if (this.platform === 'mobile') {
      const device = playwright.devices[this.device.name];

      contextOptions = {
        ...contextOptions,
        ...device,
      };
    }

    return contextOptions;
  }

  /* Url vars and functions */
  public static url: string = process.env.URL;

  /* DB helper vars and functions */
  public static db: myDbConfig = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydatabase',
  };
}
import 'dotenv/config';
import {devices} from 'playwright';

export class GlobalVars {
  private static browsersList = ['chromium', 'firefox', 'webkit'];
  private static platformsList = ['desktop', 'mobile'];

  /* Browser vars and functions */
  public static platform = process.env.PLATFORM || 'desktop';

  public static browser = {
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
  public static getBrowserOptions() {
    if (this.platformsList.indexOf(this.platform) === -1) {
      throw new Error(`The framework can't handle the platform ${this.platform}`)
    }

    if (this.browsersList.indexOf(this.browser.name) === -1) {
      throw new Error(`The framework can't handle the browser ${this.browser.name}`);
    }

    let browserOptions;

    if (this.platform === 'mobile' || this.browser.name === 'chromium') {
      browserOptions = {
        ...this.browser.options,
        chromiumSandbox: false,
      }

      browserOptions.args.push('--disable-web-security');
    } else {
      browserOptions = this.browser.options;
    }

    return browserOptions;
  }

  /* Browser context vars and functions */
  public static browserContext = {
    options: {
      viewport: {
        width: parseInt(process.env.WIDTH || '1680', 10),
        height: parseInt(process.env.HEIGHT || '900', 10),
      },
      locale: process.env.LOCALE || 'fr-FR',
      httpCredentials: {
        username: process.env.HTTP_CRED_USERNAME || '',
        password: process.env.HTTP_CRED_PASSWORD || '',
      }
    },
  };

  public static device = {
    name: process.env.DEVICE,
  };

  /**
   * Get Browser context options
   */
  public static getBrowserContextOptions() {
    let contextOptions = this.browserContext.options;

    if (this.platform === 'mobile') {
      const device = devices[this.device.name!];

      contextOptions = {
        ...contextOptions,
        ...device,
      };
    }

    return contextOptions;
  }

  /* Url vars and functions */
  public static url?: string = process.env.URL;

  /* DB helper vars and functions */
  public static db = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydatabase',
  };
}
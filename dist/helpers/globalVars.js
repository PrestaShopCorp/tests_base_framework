"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalVars = void 0;
require("dotenv/config");
const playwright_1 = require("playwright");
class GlobalVars {
    /**
     * Get browser options
     */
    static getBrowserOptions() {
        if (this.platformsList.indexOf(this.platform) === -1) {
            throw new Error(`The framework can't handle the platform ${this.platform}`);
        }
        if (this.browsersList.indexOf(this.browser.name) === -1) {
            throw new Error(`The framework can't handle the browser ${this.browser.name}`);
        }
        let browserOptions;
        if (this.platform === 'mobile' || this.browser.name === 'chromium') {
            browserOptions = Object.assign(Object.assign({}, this.browser.options), { chromiumSandbox: false });
            browserOptions.args.push('--disable-web-security');
        }
        else {
            browserOptions = this.browser.options;
        }
        return browserOptions;
    }
    /**
     * Get Browser context options
     */
    static getBrowserContextOptions() {
        let contextOptions = this.browserContext.options;
        if (this.platform === 'mobile') {
            const device = playwright_1.devices[this.device.name];
            contextOptions = Object.assign(Object.assign({}, contextOptions), device);
        }
        return contextOptions;
    }
}
exports.GlobalVars = GlobalVars;
GlobalVars.browsersList = ['chromium', 'firefox', 'webkit'];
GlobalVars.platformsList = ['desktop', 'mobile'];
/* Browser vars and functions */
GlobalVars.platform = process.env.PLATFORM || 'desktop';
GlobalVars.browser = {
    name: process.env.BROWSER || 'chromium',
    // Define browser options
    options: {
        headless: JSON.parse(process.env.HEADLESS || 'true'),
        timeout: 0,
        slowMo: parseInt(process.env.SLOW_MO || '5', 10),
        acceptDownloads: JSON.parse(process.env.ACCEPT_DOWNLOADS || 'true'),
        args: [],
    },
};
/* Browser context vars and functions */
GlobalVars.browserContext = {
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
GlobalVars.device = {
    name: process.env.DEVICE,
};
/* Url vars and functions */
GlobalVars.url = process.env.URL;
/* DB helper vars and functions */
GlobalVars.db = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'mydatabase',
};
/* Screenshots activation */
GlobalVars.screenshots = {
    active: process.env.SCREENSHOTS_ON || true,
    folder: process.env.SCREENSHOTS_FOLDER || './screenshots',
};

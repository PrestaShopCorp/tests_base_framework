"use strict";
var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalVars = void 0;
const dotenv_1 = require("dotenv");
const playwright_1 = require("playwright");
(0, dotenv_1.config)({ path: '.env' });
class GlobalVars {
    /**
     * Get browser options
     */
    static getBrowserOptions() {
        if (!this.platformsList.includes(this.platform)) {
            throw new Error(`The framework can't handle the platform ${this.platform}`);
        }
        if (!this.browsersList.includes(this.browser.name)) {
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
GlobalVars.platform = (_a = process.env.PLATFORM) !== null && _a !== void 0 ? _a : 'desktop';
GlobalVars.browser = {
    name: ((_b = process.env.BROWSER) !== null && _b !== void 0 ? _b : 'chromium'),
    // Define browser options
    options: {
        headless: !(process.env.HEADLESS === 'false'),
        timeout: 0,
        slowMo: parseInt((_c = process.env.SLOW_MO) !== null && _c !== void 0 ? _c : '5', 10),
        acceptDownloads: !((_d = process.env.ACCEPT_DOWNLOADS) !== null && _d !== void 0 ? _d : 'true'),
        args: []
    }
};
/* Browser context vars and functions */
GlobalVars.browserContext = {
    options: {
        viewport: {
            width: parseInt((_e = process.env.WIDTH) !== null && _e !== void 0 ? _e : '1680', 10),
            height: parseInt((_f = process.env.HEIGHT) !== null && _f !== void 0 ? _f : '900', 10)
        },
        locale: (_g = process.env.LOCALE) !== null && _g !== void 0 ? _g : 'fr-FR',
        httpCredentials: {
            username: (_h = process.env.HTTP_CRED_USERNAME) !== null && _h !== void 0 ? _h : '',
            password: (_j = process.env.HTTP_CRED_PASSWORD) !== null && _j !== void 0 ? _j : ''
        }
    }
};
GlobalVars.device = {
    name: process.env.DEVICE
};
/* Url vars and functions */
GlobalVars.url = process.env.URL;
/* DB helper vars and functions */
GlobalVars.db = {
    host: (_k = process.env.DB_HOST) !== null && _k !== void 0 ? _k : 'localhost',
    user: (_l = process.env.DB_USER) !== null && _l !== void 0 ? _l : 'root',
    password: (_m = process.env.DB_PASSWORD) !== null && _m !== void 0 ? _m : '',
    database: (_o = process.env.DB_NAME) !== null && _o !== void 0 ? _o : 'mydatabase'
};
/* Screenshots activation */
GlobalVars.screenshots = {
    active: (_p = process.env.SCREENSHOTS_ON) !== null && _p !== void 0 ? _p : true,
    folder: (_q = process.env.SCREENSHOTS_FOLDER) !== null && _q !== void 0 ? _q : './screenshots'
};

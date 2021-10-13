// Browser config
global.platform = process.env.PLATFORM || 'desktop';

// All browsers config
global.browser = {
  name: process.env.BROWSER || 'chromium',

  // Define browser options
  options: {
    headless: JSON.parse(process.env.HEADLESS || true),
    timeout: 0,
    slowMo: parseInt(process.env.SLOW_MO, 10) || 5,
    acceptDownloads: JSON.parse(process.env.ACCEPT_DOWNLOADS || true),
    args: [],
  },
};

// Chromium options
global.chromiumBrowser = global.browser;
global.chromiumBrowser.options.chromiumSandbox = false;
global.chromiumBrowser.options.args.push('--disable-web-security');

// Context options
global.browserContext = {
  options: {
    viewport: {
      width: process.env.WIDTH || 1680,
      height: process.env.HEIGHT || 900,
    },
    locale: process.env.LOCALE || 'fr-FR',
  },
};

// Device options
global.device = {
  name: process.env.DEVICE,
};

// Tests globals
global.url = process.env.URL;

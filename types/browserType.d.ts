interface myBrowserOptions {
  headless: boolean;
  timeout: number;
  slowMo: number;
  acceptDownloads: boolean;
  args: string[];
  chromiumSandbox?: boolean;
}

interface myBrowserConfig {
  name: string;
  options: myBrowserOptions;
}

interface myContextOption {
  viewport: {
    width: number;
    height: number
  };
  locale: string;
}

interface myContextConfig {
  options: myContextOption;
}

interface myDeviceConfig {
  name: string;
}

interface myDbConfig {
  host: string;
  user: string;
  password: string;
  database: string;
}

export {myBrowserOptions, myBrowserConfig, myContextOption, myContextConfig, myDeviceConfig, myDbConfig};

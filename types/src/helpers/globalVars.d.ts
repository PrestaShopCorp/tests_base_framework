export declare class GlobalVars {
    private static browsersList;
    private static platformsList;
    static platform: string;
    static browser: {
        name: "chromium" | "firefox" | "webkit";
        options: {
            headless: boolean;
            timeout: number;
            slowMo: number;
            acceptDownloads: boolean;
            args: string[];
        };
    };
    /**
     * Get browser options
     */
    static getBrowserOptions(): {
        headless: boolean;
        timeout: number;
        slowMo: number;
        acceptDownloads: boolean;
        args: string[];
    } | {
        chromiumSandbox: boolean;
        headless: boolean;
        timeout: number;
        slowMo: number;
        acceptDownloads: boolean;
        args: string[];
    };
    static browserContext: {
        options: {
            viewport: {
                width: number;
                height: number;
            };
            locale: string;
            httpCredentials: {
                username: string;
                password: string;
            };
        };
    };
    static device: {
        name: string;
    };
    /**
     * Get Browser context options
     */
    static getBrowserContextOptions(): {
        viewport: {
            width: number;
            height: number;
        };
        locale: string;
        httpCredentials: {
            username: string;
            password: string;
        };
    };
    static url?: string;
    static db: {
        host: string;
        user: string;
        password: string;
        database: string;
    };
    static screenshots: {
        active: string | boolean;
        folder: string;
    };
}

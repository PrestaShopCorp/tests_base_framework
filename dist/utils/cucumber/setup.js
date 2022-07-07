"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("@cucumber/cucumber");
const browserHelper = require("../../helpers/browserHelper");
let browser;
/**
 * Create unique browser for all mocha run
 */
(0, cucumber_1.BeforeAll)(() => __awaiter(void 0, void 0, void 0, function* () {
    // Add browser to mocha context so we can access it from all files
    browser = yield browserHelper.createBrowser();
}));
/**
 * Create context and add tan
 */
(0, cucumber_1.Before)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        this.browser = browser;
        this.browserContext = yield browserHelper.createContext(this.browser);
        this.browserTab = yield browserHelper.addTab(this.browserContext);
    });
});
/**
 * Destroy context when test is finished
 * Tabs are destroyed with the context
 */
(0, cucumber_1.After)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield browserHelper.closeContext(this.browserContext);
    });
});
/**
 * Close browser after finish the run
 */
(0, cucumber_1.AfterAll)(function () {
    return __awaiter(this, void 0, void 0, function* () {
        yield browserHelper.closeBrowser(browser);
    });
});

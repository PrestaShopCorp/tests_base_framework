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
exports.mochaHooks = void 0;
const globalVars_1 = require("../../helpers/globalVars");
const browserHelper_1 = require("../../helpers/browserHelper");
let failPosition = 1;
exports.mochaHooks = {
    /**
     * Create unique browser for all mocha run
     */
    beforeAll: function () {
        return __awaiter(this, void 0, void 0, function* () {
            this.browser = yield (0, browserHelper_1.createBrowser)();
        });
    },
    /**
     * Take screenshot after fail
     */
    afterEach: function () {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            if (globalVars_1.GlobalVars.screenshots.active &&
                ((_a = this.currentTest) === null || _a === void 0 ? void 0 : _a.state) === 'failed') {
                // Get last context used
                const context = (0, browserHelper_1.getBrowserContext)(this.browser);
                // Get last used tab
                const page = (0, browserHelper_1.getTab)(context);
                yield page.screenshot({
                    path: `${globalVars_1.GlobalVars.screenshots.folder}/${failPosition}.png`,
                    fullPage: true
                });
                failPosition++;
            }
        });
    },
    /**
     * Close browser after finish the run
     */
    afterAll: function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, browserHelper_1.closeBrowser)(this.browser);
        });
    }
};

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
const browserHelper_1 = require("../../helpers/browserHelper");
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
     * Close browser after finish the run
     */
    afterAll: function () {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, browserHelper_1.closeBrowser)(this.browser);
        });
    }
};

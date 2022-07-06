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
exports.CommonPage = void 0;
/**
 * Parent page: Page, contains functions that can be used in every page (BO, FO ...)
 * @class
 */
class CommonPage {
    /**
     * Get page title
     * @param page {Page} Browser tab
     * @returns {Promise<string>}
     */
    getPageTitle(page) {
        return __awaiter(this, void 0, void 0, function* () {
            return page.title();
        });
    }
    /**
     * Go to URL
     * @param page {Page} Browser tab
     * @param url {string} Url to go to
     * @param waitUntil {'networkidle' | 'load' | 'domcontentloaded' | undefined} Event to wait for
     * @returns {Promise<void>}
     */
    goTo(page, url, waitUntil = 'networkidle') {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.goto(url, { waitUntil });
        });
    }
    /**
     * Get current url
     * @param page {Page} Browser tab
     * @returns {string}
     */
    getCurrentURL(page) {
        return decodeURIComponent(page.url());
    }
    /**
     * Wait for timeout to sleep a browsing
     * @param page {Page} Browser tab
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @returns {Promise<void>}
     */
    waitForTimeout(page, timeout = 10000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.waitForTimeout(timeout);
        });
    }
    /**
     * Wait for selector to have a state
     * @param page {Page} Browser tab
     * @param selector {string} selector to wait
     * @param state {'attached' | 'detached' | 'visible' | 'hidden' | undefined} Selector state
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @returns {Promise<void>}
     */
    waitForSelector(page, selector, state, timeout = 10000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.waitForSelector(selector, { state, timeout });
        });
    }
    /**
     * Wait for selector to be visible
     * @param page {Page} Browser tab
     * @param selector {string} selector to wait
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @return {Promise<void>}
     */
    waitForVisibleSelector(page, selector, timeout = 10000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForSelector(page, selector, 'visible', timeout);
        });
    }
    /**
     * Wait for selector to be visible
     * @param page {Page} Browser tab
     * @param selector {string} selector to wait
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @return {Promise<void>}
     */
    waitForHiddenSelector(page, selector, timeout = 10000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForSelector(page, selector, 'hidden', timeout);
        });
    }
    /**
     * Wait for selector to be attached
     * @param page {Page} Browser tab
     * @param selector {string} selector to wait
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @return {Promise<void>}
     */
    waitForAttachedSelector(page, selector, timeout = 10000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForSelector(page, selector, 'attached', timeout);
        });
    }
    /**
     * Wait for selector to be detached
     * @param page {Page} Browser tab
     * @param selector {string} selector to wait
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @return {Promise<void>}
     */
    waitForDetachedSelector(page, selector, timeout = 10000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForSelector(page, selector, 'detached', timeout);
        });
    }
    /**
     * Get Text from element
     * @param page {Page} Browser tab
     * @param selector{string} From where to get text
     * @param waitForSelector {boolean} True to wait for selector to be visible before getting text
     * @return {Promise<string>}
     */
    getTextContent(page, selector, waitForSelector = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (waitForSelector) {
                yield this.waitForVisibleSelector(page, selector);
            }
            const textContent = yield page.$eval(selector, (el) => el.textContent);
            return textContent ? textContent.replace(/\s+/g, ' ').trim() : null;
        });
    }
    /**
     * Get attribute from element
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element
     * @param attribute {string} Name of the attribute to get
     * @returns {Promise<string>}
     */
    getAttributeContent(page, selector, attribute) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.waitForSelector(selector, { state: 'attached' });
            return page.$eval(selector, (el, attr) => el.getAttribute(attr), attribute);
        });
    }
    /**
     * Is element visible
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @returns {Promise<boolean>} True if visible, false if not
     */
    elementVisible(page, selector, timeout = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.waitForVisibleSelector(page, selector, timeout);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    /**
     * Is element not visible
     * @param page {Page} Browser tab
     * @param selector, element to check
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @returns {Promise<boolean>} True if not visible, false if visible
     */
    elementNotVisible(page, selector, timeout = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.waitForHiddenSelector(page, selector, timeout);
                return true;
            }
            catch (error) {
                return false;
            }
        });
    }
    /**
     * Open link in new Tab and get opened Page
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element for the click
     * @param newPageSelector {string} String to locate the element on the opened page (default to FO logo)
     * @return {Promise<Page>} Opened tab after the click
     */
    openLinkWithTargetBlank(page, selector, newPageSelector = 'body .logo') {
        return __awaiter(this, void 0, void 0, function* () {
            const [newPage] = yield Promise.all([
                page.waitForEvent('popup'),
                page.click(selector)
            ]);
            yield newPage.waitForLoadState('networkidle');
            yield this.waitForVisibleSelector(newPage, newPageSelector);
            return newPage;
        });
    }
    /**
     * Wait for selector and click
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element for the check
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @return {Promise<void>}
     */
    waitForSelectorAndClick(page, selector, timeout = 5000) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForVisibleSelector(page, selector, timeout);
            yield page.click(selector);
        });
    }
    /**
     * Reload actual browser page
     * @param page {Page} Browser tab
     * @return {Promise<void>}
     */
    reloadPage(page) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.reload();
        });
    }
    /**
     * Delete the existing text from input then set a value
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the input to set its value
     * @param value {?string|number} Value to set on the input
     * @return {Promise<void>}
     */
    setValue(page, selector, value) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.fill(selector, value);
        });
    }
    /**
     * Delete text from input
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element for the deletion
     * @returns {Promise<void>}
     */
    deleteTextFromInput(page, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.waitForSelectorAndClick(page, selector);
            yield page.click(selector, { clickCount: 3 });
            // Delete text from input before typing
            yield page.waitForTimeout(100);
            yield page.press(selector, 'Delete');
        });
    }
    /**
     * To accept or dismiss a javascript dialog
     * @param page {Page} Browser tab
     * @param accept {boolean} True to accept the dialog, false to dismiss
     * @param text {string} Text to set on dialog input
     * @returns {void}
     */
    dialogListener(page, accept, text) {
        page.once('dialog', (dialog) => {
            if (accept) {
                if (text !== '')
                    void dialog.accept(text);
                else
                    void dialog.accept();
            }
            else {
                void dialog.dismiss();
            }
        });
    }
    /**
     * Close actual tab and goto another tab if wanted
     * @param browserContext {BrowserContext} Context of the page
     * @param page {Page} Browser tab
     * @param tabId {number} Tab to get focus on after closing the other tab
     * @return {Promise<Page|null>}
     */
    closePage(browserContext, page, tabId = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.close();
            if (tabId !== -1) {
                return browserContext.pages()[tabId];
            }
            return null;
        });
    }
    /**
     * Scroll to element
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element to scroll to
     * @return {Promise<void>}
     */
    scrollTo(page, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.$eval(selector, (el) => el.scrollIntoView());
        });
    }
    /**
     * Select option in select by visible text
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the select
     * @param textValue {string|number} Value to select
     * @param force {boolean} Forcing the value of the select
     * @returns {Promise<void>}
     */
    selectByVisibleText(page, selector, textValue, force = false) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.selectOption(selector, { label: textValue.toString() }, { force });
        });
    }
    /**
     * To get a number from text
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @returns {Promise<number>}
     */
    getNumberFromText(page, selector, timeout = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.waitForTimeout(timeout);
            const text = yield this.getTextContent(page, selector);
            const number = /\d+/g.exec(text).toString();
            return parseInt(number, 10);
        });
    }
    /**
     * Go to Page and wait for navigation
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element
     * @param waitUntil {} The event to wait after click
     * @return {Promise<void>}
     */
    clickAndWaitForNavigation(page, selector, waitUntil = 'networkidle') {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                page.waitForNavigation({ waitUntil }),
                page.click(selector)
            ]);
        });
    }
    /**
     * Navigate to the previous page in history
     * @param page {Page} Browser tab
     * @param waitUntil {'networkidle' | 'load' | 'domcontentloaded' | undefined} The event to wait after on navigation
     * @return {Promise<void>}
     */
    goToPreviousPage(page, waitUntil = 'load') {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.goBack({ waitUntil });
        });
    }
    /**
     * Check if checkbox is selected
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the checkbox
     * @return {Promise<boolean>}
     */
    isCheckboxSelected(page, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            return page.isChecked(selector);
        });
    }
    /**
     * Select, unselect checkbox
     * @param page {Page} Browser tab
     * @param checkboxSelector {string} String to locate the checkbox
     * @param valueWanted {boolean} Value wanted on the selector
     * @return {Promise<void>}
     */
    changeCheckboxValue(page, checkboxSelector, valueWanted = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (valueWanted) {
                yield page.check(checkboxSelector);
            }
            else {
                yield page.uncheck(checkboxSelector);
            }
        });
    }
    /**
     * Drag and drop element
     * @param page {Page} Browser tab
     * @param source {string} String to locate the element to drag
     * @param target {string} String to locate the element where to drop
     * @return {Promise<void>}
     */
    dragAndDrop(page, source, target) {
        return __awaiter(this, void 0, void 0, function* () {
            yield page.dragAndDrop(source, target);
        });
    }
    /**
     * Upload file in input type=file selector
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the file input
     * @param filePath {string} Path of the file to add
     * @return {Promise<void>}
     */
    uploadFile(page, selector, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            const input = yield page.$(selector);
            yield input.setInputFiles(filePath);
        });
    }
    /**
     * Upload file using file chooser
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the file chooser
     * @param filePath {Array<string>} Path of the file to add
     * @returns {Promise<void>}
     */
    uploadOnFileChooser(page, selector, filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            // Set value when fileChooser is open
            page.once('filechooser', (fileChooser) => {
                void fileChooser.setFiles(filePath);
            });
            yield page.click(selector);
        });
    }
    /**
     * Get parent element from selector
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the child element
     * @return {Promise<ElementHandle>}
     */
    getParentElement(page, selector) {
        return page.evaluateHandle((sl) => document.querySelector(sl).parentElement, selector);
    }
    /**
     * Click on selector and wait for download event
     * @param page {Page} Browser tab
     * @param selector {string} Selector to click on
     * @param targetBlank {boolean} Link has attribute target=blank
     * @returns {Promise<string|null>}
     */
    clickAndWaitForDownload(page, selector, targetBlank = false) {
        return __awaiter(this, void 0, void 0, function* () {
            // Delete the target because a new tab is opened when downloading the file
            if (targetBlank) {
                // @ts-ignore
                yield page.$eval(selector, (el) => (el.target = ''));
            }
            /* eslint-enable no-return-assign, no-param-reassign */
            const [download] = yield Promise.all([
                page.waitForEvent('download'),
                page.click(selector)
            ]);
            return download.path();
        });
    }
    /**
     * Get bounding rect
     * @param page {Page} Browser tab
     * @param selector {string} Selector to get bounding rect from
     * @returns {Promise<DOMRect|undefined>}
     */
    getBoundingClientRect(page, selector) {
        return page.evaluate((sl) => { var _a; return (_a = document.querySelector(sl)) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().toJSON(); }, selector);
    }
    /**
     * Get document client size
     * @param page {Page} Browser tab
     * @returns {Promise<{ vw: number; vh: number }>}
     */
    getDocumentClientSize(page) {
        return page.evaluate(() => {
            return {
                vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0),
                vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
            };
        });
    }
    /**
     * Check if an element is visible in viewport after a page scroll
     * @param page {Page} Browser tab
     * @param selector {string} Selector to check visibility
     * @returns {Promise<boolean>} True if selector visible in viewport and False if not
     */
    isElementVisibleAfterScroll(page, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            const rect = yield this.getBoundingClientRect(page, selector);
            if (rect.top >= 0 && rect.left >= 0) {
                const documentSize = yield this.getDocumentClientSize(page);
                return rect.right <= documentSize.vw && rect.bottom <= documentSize.vh;
            }
            return false;
        });
    }
}
exports.CommonPage = CommonPage;

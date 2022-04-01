import type { BrowserContext, ElementHandle, JSHandle, Page } from 'playwright';
/**
 * Parent page: Page, contains functions that can be used in every page (BO, FO ...)
 * @class
 */
export declare class CommonPage {
    /**
     * Get page title
     * @param page {Page} Browser tab
     * @returns {Promise<string>}
     */
    getPageTitle(page: Page): Promise<string>;
    /**
     * Go to URL
     * @param page {Page} Browser tab
     * @param url {string} Url to go to
     * @param waitUntil {'networkidle' | 'load' | 'domcontentloaded' | undefined} Event to wait for
     * @returns {Promise<void>}
     */
    goTo(page: Page, url: string, waitUntil?: 'networkidle' | 'load' | 'domcontentloaded' | undefined): Promise<void>;
    /**
     * Get current url
     * @param page {Page} Browser tab
     * @returns {Promise<string>}
     */
    getCurrentURL(page: Page): Promise<string>;
    /**
     * Wait for selector to have a state
     * @param page {Page} Browser tab
     * @param selector {string} selector to wait
     * @param state {'attached' | 'detached' | 'visible' | 'hidden' | undefined} Selector state
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @returns {Promise<void>}
     */
    waitForSelector(page: Page, selector: string, state: 'attached' | 'detached' | 'visible' | 'hidden' | undefined, timeout?: number): Promise<void>;
    /**
     * Wait for selector to be visible
     * @param page {Page} Browser tab
     * @param selector {string} selector to wait
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @return {Promise<void>}
     */
    waitForVisibleSelector(page: Page, selector: string, timeout?: number): Promise<void>;
    /**
     * Wait for selector to be visible
     * @param page {Page} Browser tab
     * @param selector {string} selector to wait
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @return {Promise<void>}
     */
    waitForHiddenSelector(page: Page, selector: string, timeout?: number): Promise<void>;
    /**
     * Wait for selector to be attached
     * @param page {Page} Browser tab
     * @param selector {string} selector to wait
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @return {Promise<void>}
     */
    waitForAttachedSelector(page: Page, selector: string, timeout?: number): Promise<void>;
    /**
     * Wait for selector to be detached
     * @param page {Page} Browser tab
     * @param selector {string} selector to wait
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @return {Promise<void>}
     */
    waitForDetachedSelector(page: Page, selector: string, timeout?: number): Promise<void>;
    /**
     * Get Text from element
     * @param page {Page} Browser tab
     * @param selector{string} From where to get text
     * @param waitForSelector {boolean} True to wait for selector to be visible before getting text
     * @return {Promise<string>}
     */
    getTextContent(page: Page, selector: string, waitForSelector?: boolean): Promise<string | null>;
    /**
     * Get attribute from element
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element
     * @param attribute {string} Name of the attribute to get
     * @returns {Promise<string>}
     */
    getAttributeContent(page: Page, selector: string, attribute: string): Promise<string | null>;
    /**
     * Is element visible
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @returns {Promise<boolean>} True if visible, false if not
     */
    elementVisible(page: Page, selector: string, timeout?: number): Promise<boolean>;
    /**
     * Is element not visible
     * @param page {Page} Browser tab
     * @param selector, element to check
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @returns {Promise<boolean>} True if not visible, false if visible
     */
    elementNotVisible(page: Page, selector: string, timeout?: number): Promise<boolean>;
    /**
     * Open link in new Tab and get opened Page
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element for the click
     * @param newPageSelector {string} String to locate the element on the opened page (default to FO logo)
     * @return {Promise<Page>} Opened tab after the click
     */
    openLinkWithTargetBlank(page: Page, selector: string, newPageSelector?: string): Promise<Page>;
    /**
     * Wait for selector and click
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element for the check
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @return {Promise<void>}
     */
    waitForSelectorAndClick(page: Page, selector: string, timeout?: number): Promise<void>;
    /**
     * Reload actual browser page
     * @param page {Page} Browser tab
     * @return {Promise<void>}
     */
    reloadPage(page: Page): Promise<void>;
    /**
     * Delete the existing text from input then set a value
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the input to set its value
     * @param value {?string|number} Value to set on the input
     * @return {Promise<void>}
     */
    setValue(page: Page, selector: string, value: string): Promise<void>;
    /**
     * Delete text from input
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element for the deletion
     * @returns {Promise<void>}
     */
    deleteTextFromInput(page: Page, selector: string): Promise<void>;
    /**
     * To accept or dismiss a javascript dialog
     * @param page {Page} Browser tab
     * @param accept {boolean} True to accept the dialog, false to dismiss
     * @param text {string} Text to set on dialog input
     * @return {Promise<void>}
     */
    dialogListener(page: Page, accept?: boolean, text?: string): Promise<void>;
    /**
     * Close actual tab and goto another tab if wanted
     * @param browserContext {BrowserContext} Context of the page
     * @param page {Page} Browser tab
     * @param tabId {number} Tab to get focus on after closing the other tab
     * @return {Promise<Page|null>}
     */
    closePage(browserContext: BrowserContext, page: Page, tabId?: number): Promise<Page | null>;
    /**
     * Scroll to element
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element to scroll to
     * @return {Promise<void>}
     */
    scrollTo(page: Page, selector: string): Promise<void>;
    /**
     * Select option in select by visible text
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the select
     * @param textValue {string|number} Value to select
     * @param force {boolean} Forcing the value of the select
     * @returns {Promise<void>}
     */
    selectByVisibleText(page: Page, selector: string, textValue: string | number, force?: boolean): Promise<void>;
    /**
     * To get a number from text
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element
     * @param timeout {number} Time to wait on milliseconds before throwing an error
     * @returns {Promise<number>}
     */
    getNumberFromText(page: Page, selector: string, timeout?: number): Promise<number>;
    /**
     * Go to Page and wait for navigation
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the element
     * @param waitUntil {} The event to wait after click
     * @return {Promise<void>}
     */
    clickAndWaitForNavigation(page: Page, selector: string, waitUntil?: 'networkidle' | 'load' | 'domcontentloaded' | undefined): Promise<void>;
    /**
     * Navigate to the previous page in history
     * @param page {Page} Browser tab
     * @param waitUntil {'networkidle' | 'load' | 'domcontentloaded' | undefined} The event to wait after on navigation
     * @return {Promise<void>}
     */
    goToPreviousPage(page: Page, waitUntil?: 'networkidle' | 'load' | 'domcontentloaded' | undefined): Promise<void>;
    /**
     * Check if checkbox is selected
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the checkbox
     * @return {Promise<boolean>}
     */
    isCheckboxSelected(page: Page, selector: string): Promise<boolean>;
    /**
     * Select, unselect checkbox
     * @param page {Page} Browser tab
     * @param checkboxSelector {string} String to locate the checkbox
     * @param valueWanted {boolean} Value wanted on the selector
     * @return {Promise<void>}
     */
    changeCheckboxValue(page: Page, checkboxSelector: string, valueWanted?: boolean): Promise<void>;
    /**
     * Drag and drop element
     * @param page {Page} Browser tab
     * @param source {string} String to locate the element to drag
     * @param target {string} String to locate the element where to drop
     * @return {Promise<void>}
     */
    dragAndDrop(page: Page, source: string, target: string): Promise<void>;
    /**
     * Upload file in input type=file selector
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the file input
     * @param filePath {string} Path of the file to add
     * @return {Promise<void>}
     */
    uploadFile(page: Page, selector: string, filePath: string): Promise<void>;
    /**
     * Upload file using file chooser
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the file chooser
     * @param filePath {Array<string>} Path of the file to add
     * @returns {Promise<void>}
     */
    uploadOnFileChooser(page: Page, selector: string, filePath: string): Promise<void>;
    /**
     * Get parent element from selector
     * @param page {Page} Browser tab
     * @param selector {string} String to locate the child element
     * @return {Promise<ElementHandle>}
     */
    getParentElement(page: Page, selector: string): Promise<JSHandle<null> | ElementHandle<HTMLElement>>;
    /**
     * Click on selector and wait for download event
     * @param page {Page} Browser tab
     * @param selector {string} Selector to click on
     * @param targetBlank {boolean} Link has attribute target=blank
     * @returns {Promise<string|null>}
     */
    clickAndWaitForDownload(page: Page, selector: string, targetBlank?: boolean): Promise<string | null>;
    /**
     *
     * Check if an element is visible in viewport after a page scroll
     * @param page {Page} Browser tab
     * @param selector {string} Selector to check visibility
     * @returns {Promise<boolean>} True if selector visible in viewport and False if not
     */
    isElementVisibleAfterScroll(page: Page, selector: string): Promise<boolean>;
}

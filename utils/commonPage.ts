/**
 * Parent page: Page, contains functions that can be used in every page (BO, FO ...)
 * @class
 */
import {BrowserContext, Page, ElementHandle} from 'playwright';

export class CommonPage {
  /**
   * Get page title
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async getPageTitle(page: Page): Promise<string> {
    return page.title();
  }

  /**
   * Go to URL
   * @param page {Page} Browser tab
   * @param url {string} Url to go to
   * @param waitUntil {'networkidle' | 'load' | 'domcontentloaded' | undefined} Event to wait for
   * @returns {Promise<void>}
   */
  async goTo(
    page: Page,
    url: string,
    waitUntil: 'networkidle' | 'load' | 'domcontentloaded' | undefined = 'networkidle'
  ): Promise<void> {
    await page.goto(url, {waitUntil});
  }

  /**
   * Get current url
   * @param page {Page} Browser tab
   * @returns {Promise<string>}
   */
  async getCurrentURL(page: Page): Promise<string> {
    return decodeURIComponent(page.url());
  }

  /**
   * Wait for selector to have a state
   * @param page {Page} Browser tab
   * @param selector {string} selector to wait
   * @param state {'attached' | 'detached' | 'visible' | 'hidden' | undefined} Selector state
   * @param timeout {number} Time to wait on milliseconds before throwing an error
   * @returns {Promise<void>}
   */
  async waitForSelector(
    page: Page,
    selector: string,
    state: 'attached' | 'detached' | 'visible' | 'hidden' | undefined,
    timeout = 10000
  ): Promise<void> {
    await page.waitForSelector(selector, {state, timeout});
  }

  /**
   * Wait for selector to be visible
   * @param page {Page} Browser tab
   * @param selector {string} selector to wait
   * @param timeout {number} Time to wait on milliseconds before throwing an error
   * @return {Promise<void>}
   */
  async waitForVisibleSelector(
    page: Page,
    selector: string,
    timeout = 10000
  ): Promise<void> {
    await this.waitForSelector(page, selector, 'visible', timeout);
  }

  /**
   * Wait for selector to be visible
   * @param page {Page} Browser tab
   * @param selector {string} selector to wait
   * @param timeout {number} Time to wait on milliseconds before throwing an error
   * @return {Promise<void>}
   */
  async waitForHiddenSelector(
    page: Page,
    selector: string,
    timeout = 10000
  ): Promise<void> {
    await this.waitForSelector(page, selector, 'hidden', timeout);
  }

  /**
   * Wait for selector to be attached
   * @param page {Page} Browser tab
   * @param selector {string} selector to wait
   * @param timeout {number} Time to wait on milliseconds before throwing an error
   * @return {Promise<void>}
   */
  async waitForAttachedSelector(
    page: Page,
    selector: string,
    timeout = 10000
  ): Promise<void> {
    await this.waitForSelector(page, selector, 'attached', timeout);
  }

  /**
   * Wait for selector to be detached
   * @param page {Page} Browser tab
   * @param selector {string} selector to wait
   * @param timeout {number} Time to wait on milliseconds before throwing an error
   * @return {Promise<void>}
   */
  async waitForDetachedSelector(
    page: Page,
    selector: string,
    timeout = 10000
  ): Promise<void> {
    await this.waitForSelector(page, selector, 'detached', timeout);
  }

  /**
   * Get Text from element
   * @param page {Page} Browser tab
   * @param selector{string} From where to get text
   * @param waitForSelector {boolean} True to wait for selector to be visible before getting text
   * @return {Promise<string>}
   */
  async getTextContent(
    page: Page,
    selector: string,
    waitForSelector = true
  ): Promise<string|null> {
    if (waitForSelector) {
      await this.waitForVisibleSelector(page, selector);
    }
    const textContent = await page.$eval(selector, el => el.textContent);

    return textContent ? textContent.replace(/\s+/g, ' ').trim() : null;
  }

  /**
   * Get attribute from element
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the element
   * @param attribute {string} Name of the attribute to get
   * @returns {Promise<string>}
   */
  async getAttributeContent(
    page: Page,
    selector: string,
    attribute: string,
  ): Promise<string|null> {
    await page.waitForSelector(selector, {state: 'attached'});
    return page.$eval(selector, (el, attr) => el
      .getAttribute(attr), attribute);
  }

  /**
   * Is element visible
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the element
   * @param timeout {number} Time to wait on milliseconds before throwing an error
   * @returns {Promise<boolean>} True if visible, false if not
   */
  async elementVisible(
    page: Page,
    selector: string,
    timeout = 10
  ): Promise<boolean> {
    try {
      await this.waitForVisibleSelector(page, selector, timeout);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Is element not visible
   * @param page {Page} Browser tab
   * @param selector, element to check
   * @param timeout {number} Time to wait on milliseconds before throwing an error
   * @returns {Promise<boolean>} True if not visible, false if visible
   */
  async elementNotVisible(
    page: Page,
    selector: string,
    timeout = 10,
  ): Promise<boolean> {
    try {
      await this.waitForHiddenSelector(page, selector, timeout);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Open link in new Tab and get opened Page
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the element for the click
   * @param newPageSelector {string} String to locate the element on the opened page (default to FO logo)
   * @return {Promise<Page>} Opened tab after the click
   */
  async openLinkWithTargetBlank(
    page: Page,
    selector: string,
    newPageSelector = 'body .logo'
  ): Promise<Page> {
    const [newPage] = await Promise.all([
      page.waitForEvent('popup'),
      page.click(selector),
    ]);

    await newPage.waitForLoadState('networkidle');

    await this.waitForVisibleSelector(newPage, newPageSelector);
    return newPage;
  }

  /**
   * Wait for selector and click
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the element for the check
   * @param timeout {number} Time to wait on milliseconds before throwing an error
   * @return {Promise<void>}
   */
  async waitForSelectorAndClick(
    page: Page,
    selector: string,
    timeout = 5000
  ):Promise<void> {
    await this.waitForVisibleSelector(page, selector, timeout);
    await page.click(selector);
  }

  /**
   * Reload actual browser page
   * @param page {Page} Browser tab
   * @return {Promise<void>}
   */
  async reloadPage(
    page: Page
  ): Promise<void> {
    await page.reload();
  }

  /**
   * Delete the existing text from input then set a value
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the input to set its value
   * @param value {?string|number} Value to set on the input
   * @return {Promise<void>}
   */
  async setValue(
    page: Page,
    selector: string,
    value: string
  ):Promise<void> {
    await page.fill(selector, value);
  }

  /**
   * Delete text from input
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the element for the deletion
   * @returns {Promise<void>}
   */
  async deleteTextFromInput(
    page: Page,
    selector: string
  ): Promise<void> {
    await this.waitForSelectorAndClick(page, selector);
    await page.click(selector, {clickCount: 3});
    // Delete text from input before typing
    await page.waitForTimeout(100);
    await page.press(selector, 'Delete');
  }

  /**
   * To accept or dismiss a javascript dialog
   * @param page {Page} Browser tab
   * @param accept {boolean} True to accept the dialog, false to dismiss
   * @param text {string} Text to set on dialog input
   * @return {Promise<void>}
   */
  async dialogListener(
    page: Page,
    accept = true,
    text = ''
  ): Promise<void> {
    page.once('dialog', (dialog) => {
      if (accept) {
        if (text !== '') dialog.accept(text);
        else dialog.accept();
      } else {
        dialog.dismiss();
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
  async closePage(
    browserContext: BrowserContext,
    page: Page,
    tabId = -1
  ): Promise<Page|null> {
    await page.close();

    if (tabId !== -1) {
      return (browserContext.pages())[tabId];
    }
    return null;
  }

  /**
   * Scroll to element
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the element to scroll to
   * @return {Promise<void>}
   */
  async scrollTo(
    page: Page,
    selector: string
  ): Promise<void> {
    await page.$eval(selector, el => el.scrollIntoView());
  }

  /**
   * Select option in select by visible text
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the select
   * @param textValue {string|number} Value to select
   * @param force {boolean} Forcing the value of the select
   * @returns {Promise<void>}
   */
  async selectByVisibleText(
    page: Page,
    selector: string,
    textValue: string|number,
    force = false
  ): Promise<void> {
    await page.selectOption(selector, {label: textValue.toString()}, {force});
  }

  /**
   * To get a number from text
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the element
   * @param timeout {number} Time to wait on milliseconds before throwing an error
   * @returns {Promise<number>}
   */
  async getNumberFromText(
    page: Page,
    selector: string,
    timeout = 0
  ): Promise<number> {
    await page.waitForTimeout(timeout);
    const text = await this.getTextContent(page, selector);
    const number = /\d+/g.exec(text).toString();

    return parseInt(number, 10);
  }

  /**
   * Go to Page and wait for navigation
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the element
   * @param waitUntil {} The event to wait after click
   * @return {Promise<void>}
   */
  async clickAndWaitForNavigation(
    page: Page,
    selector: string,
    waitUntil: 'networkidle' | 'load' | 'domcontentloaded' | undefined = 'networkidle'
  ): Promise<void> {
    await Promise.all([
      page.waitForNavigation({waitUntil}),
      page.click(selector),
    ]);
  }

  /**
   * Navigate to the previous page in history
   * @param page {Page} Browser tab
   * @param waitUntil {'networkidle' | 'load' | 'domcontentloaded' | undefined} The event to wait after on navigation
   * @return {Promise<void>}
   */
  async goToPreviousPage(
    page: Page,
    waitUntil: 'networkidle' | 'load' | 'domcontentloaded' | undefined = 'load'
  ): Promise<void> {
    await page.goBack({waitUntil});
  }

  /**
   * Check if checkbox is selected
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the checkbox
   * @return {Promise<boolean>}
   */
  async isCheckboxSelected(
    page: Page,
    selector: string
  ): Promise<boolean> {
    return page.isChecked(selector);
  }

  /**
   * Select, unselect checkbox
   * @param page {Page} Browser tab
   * @param checkboxSelector {string} String to locate the checkbox
   * @param valueWanted {boolean} Value wanted on the selector
   * @return {Promise<void>}
   */
  async changeCheckboxValue(
    page: Page,
    checkboxSelector: string,
    valueWanted = true
  ): Promise<void> {
    if (valueWanted) {
      await page.check(checkboxSelector);
    } else {
      await page.uncheck(checkboxSelector);
    }
  }

  /**
   * Drag and drop element
   * @param page {Page} Browser tab
   * @param source {string} String to locate the element to drag
   * @param target {string} String to locate the element where to drop
   * @return {Promise<void>}
   */
  async dragAndDrop(
    page: Page,
    source: string,
    target: string
  ): Promise<void> {
    await page.dragAndDrop(source, target)
  }

  /**
   * Upload file in input type=file selector
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the file input
   * @param filePath {string} Path of the file to add
   * @return {Promise<void>}
   */
  async uploadFile(
    page: Page,
    selector: string,
    filePath: string
  ): Promise<void> {
    const input = await page.$(selector);
    await input.setInputFiles(filePath);
  }

  /**
   * Upload file using file chooser
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the file chooser
   * @param filePath {Array<string>} Path of the file to add
   * @returns {Promise<void>}
   */
  async uploadOnFileChooser(
    page: Page,
    selector: string,
    filePath: string
  ): Promise<void> {
    // Set value when fileChooser is open
    page.once('filechooser', async (fileChooser) => {
      await fileChooser.setFiles(filePath);
    });
    await page.click(selector);
  }

  /**
   * Get parent element from selector
   * @param page {Page} Browser tab
   * @param selector {string} String to locate the child element
   * @return {Promise<ElementHandle>}
   */
  getParentElement(
    page: Page,
    selector: string
  ): Promise<ElementHandle> {
    /* eslint-env browser */
    return page.evaluateHandle(sl => document.querySelector(sl).parentElement, selector);
  }

  /**
   * Click on selector and wait for download event
   * @param page {Page} Browser tab
   * @param selector {string} Selector to click on
   * @param targetBlank {boolean} Link has attribute target=blank
   * @returns {Promise<string>}
   */
  async clickAndWaitForDownload(
    page: Page,
    selector: string,
    targetBlank = false
  ): Promise<string> {
    // Delete the target because a new tab is opened when downloading the file
    if (targetBlank) {
      // @ts-ignore
      await page.$eval(selector, (el) => el.target = '');
    }
    /* eslint-enable no-return-assign, no-param-reassign */

    const [download] = await Promise.all([
      page.waitForEvent('download'),
      page.click(selector),
    ]);

    return download.path();
  }
}

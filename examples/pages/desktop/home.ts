import 'module-alias/register';

import {CommonPage} from '~/src';
import {Page} from 'playwright';

class Home extends CommonPage {
  public pageTitle: string;

  private readonly cookiePopup: string;
  private readonly firstVisitLink: string;

  constructor() {
    super();

    // Text
    this.pageTitle =
      'PrestaShop Addons Marketplace - Modules, Thèmes & Support';

    // Selector
    this.cookiePopup = '#axeptio_btn_acceptAll';
    this.firstVisitLink = '#ps_link_first_visit';
  }

  /**
   * Click on 'OK for me' button
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async acceptAllCookies(page: Page) {
    await this.waitForSelectorAndClick(page, this.cookiePopup);
  }

  /**
   * Click on 'First Visit' link
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToFirstVisitLink(page: Page) {
    await this.clickAndWaitForNavigation(page, this.firstVisitLink);
  }
}

const home = new Home();
export {home};

import 'module-alias/register';
import {CommonPage} from '@pages/commonPage';
import {Page} from 'playwright';

class Home extends CommonPage {
  public pageTitle: string;
  private readonly firstVisitLink: string;

  constructor() {
    super();

    // Text
    this.pageTitle = 'PrestaShop Addons Marketplace - Modules, Thèmes & Support';

    // Selector
    this.firstVisitLink = '#ps_link_first_visit';
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

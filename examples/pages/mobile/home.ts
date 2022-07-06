import 'module-alias/register';
import {CommonPage} from '../../../src/utils/pages/commonPage';
import {Page} from 'playwright';

class Home extends CommonPage {
  public pageTitle: string;
  private readonly headerBlock: string;
  private readonly burgerMenuIcon: string;
  private readonly firstVisitLink: string;

  constructor() {
    super();

    // Text
    this.pageTitle =
      'PrestaShop Addons Marketplace - Modules, Thèmes & Support';

    // Selector
    this.headerBlock = '.header';
    this.burgerMenuIcon = `${this.headerBlock} .menu-responsive`;
    this.firstVisitLink = '#ps_link_first_visit_mobile';
  }

  /**
   * Click on 'First Visit' link
   * @param page {Page} Browser tab
   * @returns {Promise<void>}
   */
  async goToFirstVisitLink(page: Page) {
    // Open menu by clicking on burger icon
    await Promise.all([
      page.click(this.burgerMenuIcon),
      this.waitForVisibleSelector(page, this.firstVisitLink)
    ]);

    await this.clickAndWaitForNavigation(page, this.firstVisitLink);
  }
}

const home = new Home();
export {home};

const CommonPage = require('@mochaExample/pages/commonPage');

class Home extends CommonPage {
  constructor() {
    super();

    // Text
    this.pageTitle = 'PrestaShop Addons Marketplace - Modules, Thèmes & Support';

    // Selector
    this.headerBlock = '.header'
    this.burgerMenuIcon = `${this.headerBlock} .menu-responsive`;
    this.firstVisitLink = '#ps_link_first_visit_mobile';
  }

  /**
   * Click on 'First Visit' link
   * @param page
   * @returns {Promise<void>}
   */
  async goToFirstVisitLink(page) {
    // Open menu by clicking on burger icon
    await Promise.all([
      page.click(this.burgerMenuIcon),
      this.waitForVisibleSelector(page, this.firstVisitLink),
    ]);

    await this.clickAndWaitForNavigation(page, this.firstVisitLink);
  }
}

module.exports = new Home();

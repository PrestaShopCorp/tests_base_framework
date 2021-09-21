const CommonPage = require('@utils/commonPage');

class Home extends CommonPage {
  constructor() {
    super();

    // Text
    this.pageTitle = 'PrestaShop Addons Marketplace - Modules, Thèmes & Support';

    // Selector
    this.firstVisitLink = '#ps_link_first_visit';
  }

  /**
   * Click on 'First Visit' link
   * @param page
   * @returns {Promise<void>}
   */
  async goToFirstVisitLink(page) {
    await this.clickAndWaitForNavigation(page, this.firstVisitLink);
  }
}

module.exports = new Home();

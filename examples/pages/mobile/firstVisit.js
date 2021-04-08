const CommonPage = require('@examples/pages/commonPage');

class FirstVisit extends CommonPage {
  constructor() {
    super();

    // Text
    this.pageFrTitle = 'Première visite sur PrestaShop Addons - PrestaShop Addons';
  }
}

module.exports = new FirstVisit();

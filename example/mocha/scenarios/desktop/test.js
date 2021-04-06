// Import chai
const {expect} = require('chai');

// Import browser helper
const browserHelper = require('@helpers/browserHelper');

// Import pages
const homePage = require('@mochaExample/pages/desktop/home');
const firstVisitPage = require('@mochaExample/pages/desktop/firstVisit');

// Browser vars
let browserContext;
let browserTab;

describe('Go to first visit page on addons', async () => {
  // Create context and add tab
  before(async function () {
    browserContext = await browserHelper.createContext(this.browser);
    browserTab = await browserHelper.addTab(browserContext);
  });

  // Destroy context when test is finished
  // Tabs are destroyed with the context
  after(async () => {
    await browserHelper.closeContext(browserContext);
  });

  it(`should go to '${global.url}'`, async () => {
    await homePage.goTo(browserTab, global.url);

    const actualTitle = await homePage.getPageTitle(browserTab);
    await expect(actualTitle).to.equal(homePage.pageTitle);
  });

  it('should go to first visit page', async function () {
    await homePage.goToFirstVisitLink(browserTab);

    const actualTitle = await firstVisitPage.getPageTitle(browserTab);
    await expect(actualTitle).to.equal(firstVisitPage.pageFrTitle);
  });
});

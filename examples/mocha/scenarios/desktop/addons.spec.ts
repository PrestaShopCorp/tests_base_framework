import 'module-alias/register';

import {expect} from 'chai';

// Import browser helper
import {browserHelper} from '@helpers/browserHelper';
import {GlobalVars} from '@helpers/globalVars';

// Import pages
import {home as homePage} from '@examples/pages/desktop/home';
import {firstVisit as firstVisitPage} from '@examples/pages/desktop/firstVisit';
import {BrowserContext, Page} from 'playwright';

// Browser vars
let browserContext: BrowserContext;
let browserTab: Page;

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

  it(`should go to '${GlobalVars.url}'`, async () => {
    await homePage.goTo(browserTab, GlobalVars.url);

    const actualTitle = await homePage.getPageTitle(browserTab);
    await expect(actualTitle).to.equal(homePage.pageTitle);
  });

  it('should go to first visit page', async () => {
    await homePage.goToFirstVisitLink(browserTab);

    const actualTitle = await firstVisitPage.getPageTitle(browserTab);
    await expect(actualTitle).to.equal(firstVisitPage.pageFrTitle);
  });
});

import 'module-alias/register';

import {expect} from 'chai';
import {GlobalVars} from '@helpers/globalVars';

// Import cucumber
import {Given, When, Then} from '@cucumber/cucumber';

// Import pages
import {home as homePage} from '@examples/pages/mobile/home';
import {firstVisit as firstVisitPage} from '@examples/pages/mobile/firstVisit';

Given('I go to url addons url', async function () {
  await homePage.goTo(this.browserTab, GlobalVars.url!);
});

Then('I am on addons home page', async function () {
  const actualTitle = await homePage.getPageTitle(this.browserTab);
  await expect(actualTitle).to.equal(homePage.pageTitle);
});

When('I go to first visit page', async function () {
  await homePage.goToFirstVisitLink(this.browserTab);
});

Then('I am on first visit page', async function () {
  const actualTitle = await firstVisitPage.getPageTitle(this.browserTab);
  expect(actualTitle).to.equal(firstVisitPage.pageFrTitle);
});

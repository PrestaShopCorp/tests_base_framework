import 'module-alias/register';

import {expect} from 'chai';
import type {Page} from 'playwright';

// Import browser helper
import {GlobalVars} from '~/src';

// Import cucumber
import {Given, When, Then} from '@cucumber/cucumber';

// Import pages
import {home as homePage} from '~/examples/pages/mobile/home';
import {firstVisit as firstVisitPage} from '~/examples/pages/mobile/firstVisit';

Given('I go to url addons url', async function () {
  await homePage.goTo(this.browserTab as Page, GlobalVars.url!);
});

Then('I am on addons home page', async function () {
  const actualTitle = await homePage.getPageTitle(this.browserTab as Page);
  expect(actualTitle).to.equal(homePage.pageTitle);
});

When('I go to first visit page', async function () {
  await homePage.goToFirstVisitLink(this.browserTab as Page);
});

Then('I am on first visit page', async function () {
  const actualTitle = await firstVisitPage.getPageTitle(
    this.browserTab as Page
  );
  expect(actualTitle).to.equal(firstVisitPage.pageFrTitle);
});

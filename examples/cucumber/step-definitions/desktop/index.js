require('module-alias/register');
// Import chai
const {expect} = require('chai');

// Import cucumber
const {Given, When, Then} = require('@cucumber/cucumber');

// Import pages
const homePage = require('@examples/pages/desktop/home');
const firstVisitPage = require('@examples/pages/desktop/firstVisit');

Given('I go to url addons url', async function () {
  await homePage.goTo(this.browserTab, global.url);
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
  await expect(actualTitle).to.equal(firstVisitPage.pageFrTitle);
});

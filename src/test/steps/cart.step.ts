import {setDefaultTimeout, Then, When} from "@cucumber/cucumber";
import {expect} from "@playwright/test";
import {pageFixture} from "../../hooks/page.fixture";

setDefaultTimeout(60 * 1000 * 2);

When('user add {string} to the cart', async function (product) {
    await pageFixture.page.locator(`//div[text()='${product}']/parent::a//parent::div/parent::div/div[3]/button`).click();
    pageFixture.logger.info(`Added product '${product}'`)
});

When('user navigates to cart page', async function () {
    await pageFixture.page.goto(`${process.env.BASEURL}cart.html`);
    pageFixture.logger.info(`Navigated to cart page`)
});

Then('user should see {string} to the cart page', async function (product) {
    await expect(pageFixture.page.locator(`//div[@class='inventory_item_name' and text()='${product}']`)).toBeVisible();
    pageFixture.logger.info(`Product '${product}' is in the cart page`)
});


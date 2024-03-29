import {After, AfterAll, Before, BeforeAll, Status} from "@cucumber/cucumber";
import {Browser, BrowserContext, chromium, Page} from "@playwright/test";
import {pageFixture} from "./page.fixture";
import {invokeBrowser} from "../helper/browsers/browser.manager";
import {getEnv} from "../helper/env/env";


let page: Page;
let browser: Browser;
let context: BrowserContext

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function () {
    context = await browser.newContext();
    page = await context.newPage();
    pageFixture.page = page;
});

After(async function ({pickle, result}) {
    //Screenshot for failure scenario
    console.log(result?.status)
    if (result?.status == Status.FAILED) {
        const img = await pageFixture.page.screenshot({path: `./screenshots/${pickle.name}.png`, type: "png"})
        this.attach(img, "image/png");
    }
    await pageFixture.page.close();
    await context.close();
});

AfterAll(async function () {
    await browser.close();
});

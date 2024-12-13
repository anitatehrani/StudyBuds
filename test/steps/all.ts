import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { remote } from "webdriverio";
import { opts, SECONDS_TIMEOUT } from "./appium";

let driver: WebdriverIO.Browser;
setDefaultTimeout(SECONDS_TIMEOUT);

Before(async function () {
  driver = await remote(opts);
  driver.implicitWait(5 * 1000);
  await driver.switchContext("FLUTTER");
});

After(async function () {
  await driver.deleteSession();
});

export function getDriver() {
  return driver;
}

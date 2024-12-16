import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { remote } from "webdriverio";

//DOCS:

//webdriverio            https://webdriver.io/docs/selectors
//native/webapp          https://github.com/appium/appium-uiautomator2-driver
//flutter-driver         https://github.com/appium/appium-flutter-driver

const osSpecificOps =
  process.env.APPIUM_OS === "android"
    ? {
        platformName: "Android",
        "appium:deviceName": process.env.DEVICE,
        "appium:app": process.env.APK,
        // __dirname +
        // "/../../frontend/build/app/outputs/apk/debug/app-debug.apk",
      }
    : process.env.APPIUM_OS === "ios"
      ? {
          platformName: "iOS",
          "appium:platformVersion": "12.2",
          "appium:deviceName": "iPhone X",
          "appium:noReset": true,
          "appium:app": __dirname + "/../apps/Runner.zip",
        }
      : {};

const opts = {
  hostname: process.env.APPIUM_HOST ? process.env.APPIUM_HOST : "127.0.0.1",
  port: Number.parseInt(
    process.env.APPIUM_PORT ? process.env.APPIUM_PORT : "4723",
  ),
  capabilities: {
    ...osSpecificOps,
    "appium:automationName": "Flutter",
    "appium:retryBackoffTime": 500,
    'appium:chromedriverAutodownload': true,
  },
};

const SECONDS_TIMEOUT = 30_000; // 30 seconds

export let driver: WebdriverIO.Browser;
setDefaultTimeout(SECONDS_TIMEOUT);

Before(async function () {
  driver = await remote(opts);
  driver.implicitWait(5_000);
  await driver.switchContext("FLUTTER");
});

After(async function () {
  if (driver) {
      await driver.deleteSession();
    }
});

export function getDriver() {
  return driver;
}

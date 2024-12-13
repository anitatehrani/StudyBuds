import { byValueKey } from 'appium-flutter-finder';
import {remote} from "webdriverio";
import { AfterAll, Before, setDefaultTimeout } from "@cucumber/cucumber";

//DOCS:

//webdriverio            https://webdriver.io/docs/selectors
//native/webapp          https://github.com/appium/appium-uiautomator2-driver
//flutter-driver         https://github.com/appium/appium-flutter-driver


export let driver:any;

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

export const opts = {
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

export const SECONDS_TIMEOUT = 30_000; // 30 seconds
setDefaultTimeout(SECONDS_TIMEOUT);

export async function login_guest(driver:any){
  const guestButton = byValueKey("guest_button");
  await driver.elementClick(guestButton);
}

export async function go_to_search_page(driver:any){
  const searchPageButton = byValueKey("icon_search");
  await driver.elementClick(searchPageButton);

  // await driver.touchAction({
  //      action: "tap",
  //      element: { elementId: searchPageButton },
  // });

}

export async function go_to_profile_page(driver:any){
  const profilePageButton = byValueKey("icon_profile");
  await driver.elementClick(profilePageButton);
}

AfterAll(async () => {
  if (driver) {
    await driver.deleteSession();
  }
});

Before(async () => {
  driver = await remote(opts);

  if(process.env.APPIUM_OS === "android"){
    // await driver.switchContext("NATIVE_APP");
    // await (await driver.$("~fab")).click();
    await driver.switchContext("FLUTTER");
  }else{
    console.log(
      "Switching context to `NATIVE_APP` is currently only applicable to Android demo app.",
    );
  }
});

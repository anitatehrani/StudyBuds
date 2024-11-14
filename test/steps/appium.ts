import {remote} from "webdriverio";
import assert from "assert";
import { byValueKey } from "appium-flutter-finder";
import { Given, When, Then, setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(60 * 1000);

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
  },
};

Given("I am on the home page not logged in", async () => {
  const counterTextFinder = byValueKey("counter");
  const buttonFinder = byValueKey("increment");

  const driver = await remote(opts);

  // if (process.env.APPIUM_OS === "android") {
  //   await driver.switchContext("NATIVE_APP");
  //   await (await driver.$("~fab")).click();
  //   await driver.switchContext("FLUTTER");
  // } else {
  //   console.log(
  //     "Switching context to `NATIVE_APP` is currently only applicable to Android demo app.",
  //   );
  // }

  assert.strictEqual(await driver.getElementText(counterTextFinder), "0");

  await driver.elementClick(buttonFinder);
  // await
  // await driver.action("pointer", {
  //   parameters: { pointerType: "touch" },
  // });
  // await driver.touchAction({
  //   action: "tap",
  //   element: { elementId: buttonFinder },
  // });

  assert.strictEqual(await driver.getElementText(counterTextFinder), "1");

  driver.deleteSession();
});

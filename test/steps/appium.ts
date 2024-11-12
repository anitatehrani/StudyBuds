const wdio = require("webdriverio");
const assert = require("assert");
const { byValueKey } = require("appium-flutter-finder");
const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");

setDefaultTimeout(60*1000);

const osSpecificOps =
  process.env.APPIUM_OS === "android"
    ? {
        platformName: "Android",
        "appium:deviceName": process.env.DEVICE,
        "appium:app": __dirname + "/../../frontend/build/app/outputs/apk/debug/app-debug.apk",
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
  port: 4723,
  capabilities: {
    ...osSpecificOps,
    "appium:automationName": "Flutter",
    "appium:retryBackoffTime": 500,
  },
};

Given("I am on the home page not logged in", async () => {
  const counterTextFinder = byValueKey("counter");
  const buttonFinder = byValueKey("increment");

  const driver = await wdio.remote(opts);

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
  await driver.touchAction({
    action: "tap",
    element: { elementId: buttonFinder },
  });

  assert.strictEqual(await driver.getElementText(counterTextFinder), "2");

  driver.deleteSession();
});

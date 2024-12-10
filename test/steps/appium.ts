

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
  },
};

export const SECONDS_TIMEOUT = 30_000; // 30 seconds

//Given("I am on the search page and logged in", async () => {
  //const counterTextFinder = byValueKey("counter");
  //const buttonFinder = byValueKey("increment");

  //const driver = await remote(opts);

  // if (process.env.APPIUM_OS === "android") {
  //   await driver.switchContext("NATIVE_APP");
  //   await (await driver.$("~fab")).click();
  //   await driver.switchContext("FLUTTER");
  // } else {
  //   console.log(
  //     "Switching context to `NATIVE_APP` is currently only applicable to Android demo app.",
  //   );
  // }

  //assert.strictEqual(await driver.getElementText(counterTextFinder), "0");

  //await driver.elementClick(buttonFinder);
  // await
  // await driver.action("pointer", {
  //   parameters: { pointerType: "touch" },
  // });
  // await driver.touchAction({
  //   action: "tap",
  //   element: { elementId: buttonFinder },
  // });

  //assert.strictEqual(await driver.getElementText(counterTextFinder), "1");

  //driver.deleteSession();

  //assert.strictEqual("1", "1");
//});

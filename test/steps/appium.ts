import { byValueKey } from 'appium-flutter-finder';


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

export async function login_guest(driver: any) {
  const guestButton = byValueKey("guest_button");
  await driver.elementClick(guestButton);
}

export async function login(driver: any) {
  const loginButton = byValueKey("login_button");
  await driver.elementClick(loginButton);
}


export async function go_to_search_page(driver: any) {
  const searchPageButton = byValueKey("icon_search");
  await driver.elementClick(searchPageButton);

  // await driver.touchAction({
  //      action: "tap",
  //      element: { elementId: searchPageButton },
  // });

}
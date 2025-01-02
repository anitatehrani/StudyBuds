import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { remote } from "webdriverio";
import { do_logout } from "../utils/utils";
import chromedriver from "chromedriver";

//DOCS:

//webdriverio            https://webdriver.io/docs/selectors
//native/webapp          https://github.com/appium/appium-uiautomator2-driver
//flutter-driver         https://github.com/appium/appium-flutter-driver

const osSpecificOps = {
    platformName: "Android",
    "appium:deviceName": process.env.DEVICE || "emulator-5554",
    "appium:app": process.env.APK || "../mobile_app/build/app/outputs/flutter-apk/app-debug.apk",
    // __dirname +
    // "/../../frontend/build/app/outputs/apk/debug/app-debug.apk",
};

const chromedriverOps = process.env.CHROMEDRIVER_PATH && process.env.CHROMEDRIVER_PATH !== "disabled" ? {
    "appium:chromedriverExecutable": process.env.CHROMEDRIVER_PATH
} : {};

const opts = {
    hostname: process.env.APPIUM_HOST ? process.env.APPIUM_HOST : "127.0.0.1",
    port: Number.parseInt(process.env.APPIUM_PORT ? process.env.APPIUM_PORT : "4723"),
    path: "/",
    capabilities: {
        ...osSpecificOps,
        ...chromedriverOps,
        "appium:automationName": "Flutter",
        "appium:chromedriverAutodownload": true, // Enables automatic ChromeDriver download
        "appium:autoGrantPermissions": true, // Automatically grant app permissions
        "appium:webviewConnectRetries": 10, // Retries for WebView connection
        "appium:enableWebviewDetailsCollection": true, // Collect WebView details
        "appium:ensureWebviewsHavePages": true, // Ensures WebView has pages before switching
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
        // do_logout();
        await driver.deleteSession();
    }
});

export function getDriver() {
    return driver;
}
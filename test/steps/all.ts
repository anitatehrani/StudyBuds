import { After, Before, setDefaultTimeout } from "@cucumber/cucumber";
import { remote } from "webdriverio";
import { do_logout } from "../utils/utils";

// DOCS:
// webdriverio            https://webdriver.io/docs/selectors
// native/webapp          https://github.com/appium/appium-uiautomator2-driver
// flutter-driver         https://github.com/appium/appium-flutter-driver

// Device and APK configuration
const osSpecificOps = {
    platformName: "Android",
    "appium:deviceName": process.env.DEVICE || "67cbd329", // Ensure this matches your physical device ADB ID
    "appium:app": process.env.APK || "D:\\Orange\\New folder\\StudyBuds\\mobile_app\\build\\app\\outputs\\flutter-apk\\app-debug.apk", // Updated to absolute Windows path
};

// Appium server options
const opts = {
    hostname: process.env.APPIUM_HOST || "192.168.13.234", // Ensure this matches your Appium server host
    port: Number.parseInt(process.env.APPIUM_PORT || "4723", 10),
    path: "/",
    capabilities: {
        ...osSpecificOps,
        "appium:automationName": "Flutter",
        "appium:chromedriverExecutable": "C:/Users/anita/AppData/Roaming/npm/node_modules/chromedriver/lib/chromedriver/chromedriver.exe", // Update with the correct path
        "appium:chromedriverAutodownload": true, // Enables automatic ChromeDriver download
        "appium:autoGrantPermissions": true, // Automatically grant app permissions
        "appium:webviewConnectRetries": 10, // Retries for WebView connection
        "appium:enableWebviewDetailsCollection": true, // Collect WebView details
        "appium:ensureWebviewsHavePages": true, // Ensures WebView has pages before switching
    },
};

// Test timeout
const SECONDS_TIMEOUT = 30_000; // 30 seconds

// WebDriverIO driver instance
export let driver: WebdriverIO.Browser;
setDefaultTimeout(SECONDS_TIMEOUT);

// Before hook: Start WebDriver session
Before(async function () {
    driver = await remote(opts);
    driver.implicitWait(5_000);
    await driver.switchContext("FLUTTER");
});

// After hook: Clean up WebDriver session
After(async function () {
    if (driver) {
        await do_logout(driver);
        await driver.deleteSession();
    }
});

// Function to get the current driver
export function getDriver() {
    return driver;
}

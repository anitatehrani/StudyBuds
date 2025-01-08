import { byText, byValueKey } from "appium-flutter-finder";
import {driver} from "../steps/all.ts";
import { exec } from "child_process";

export enum BottomBarIcon {
    search = "icon_search",
    add = "icon_add",
    notifications = "icon_notifications",
    profile = "icon_profile",
    home = "icon_home",
}

export enum UiId {
    telegramAccountIdTextField = "telegram_account_id_text_field",
    fullNameTextField = "full_name_text_field",
    studentIdTextField = "student_id_text_field",
}

type Key = string | number;
type Value = string;

export async function go_to_page(driver: WebdriverIO.Browser, bottom_bar_icon: BottomBarIcon) {
    await clickButton(driver, bottom_bar_icon);
}

export async function clickButton(driver: WebdriverIO.Browser, key: Key) {
    const btn = byValueKey(key);
    await driver.elementClick(btn);
}

export async function getText(driver: WebdriverIO.Browser, key: Key) {
    const textField = byValueKey(key);
    return await driver.getElementText(textField);
}

export function sleep(seconds: number) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

export async function waitForElement(driver: WebdriverIO.Browser, key: Key) {
    const element = byValueKey(key);
    await driver.execute("flutter:waitFor", element);
}

export async function login_guest(driver: WebdriverIO.Browser) {
    const guestButton = byValueKey("guest_button");
    await driver.elementClick(guestButton);
}

export async function login(driver: WebdriverIO.Browser, username: string, password: string) {
    // Switch to the WebView context
    console.log("Getting available contexts...");
    let webContext: string | undefined;
    for (let attempt = 1; attempt <= 5; attempt++) {
        const contexts = await driver.getContexts(); // Returns an array of contexts
        console.log(`Available contexts (attempt ${attempt}):`, contexts);

        webContext = contexts.find(
            (context) => typeof context === "string" && context.includes("WEBVIEW")
        ) as string | undefined; // Cast context to string | undefined

        if (webContext) break; // Exit loop if WebView context is found
        await driver.pause(1000); // Wait for 1 second before retrying
    }

    if (!webContext) {
        throw new Error("No web context found after multiple attempts.");
    }

    console.log("Switching to web context:", webContext);
    await driver.switchContext(webContext);


    // Fill in login form and submit
    console.log("Locating web page elements...");
    const usernameField = await driver.$('input[name="username"]');
    const passwordField = await driver.$('input[name="password"]');
    const submitButton = await driver.$('button'); // Adjust selector based on your HTML

    console.log("Filling username and password fields...");
    await usernameField.setValue(username);
    await passwordField.setValue(password);

    console.log("Clicking submit button...");
    await submitButton.click();

    // Switch back to Flutter context
    console.log("Waiting for the webview to close...");
    await driver.pause(5000); // Wait for the app to return to Flutter context

    console.log("Switching back to FLUTTER context...");
    await driver.switchContext("FLUTTER");
}

export async function waitForElementByValue(driver: WebdriverIO.Browser, value: Value) {
    await driver.execute("flutter:waitFor", byText(value));
}

export async function editTextField(driver: WebdriverIO.Browser, key: Key, value: Value) {
  const textField = byValueKey(key);
  await driver.elementSendKeys(textField, value);
}

export async function clickDropdownItemByValue(driver: WebdriverIO.Browser, value: string) {
  const item = byText(value);
  await driver.elementClick(item);
}

export async function do_logout(driver: WebdriverIO.Browser) {
    const logout_button = byValueKey('logout_button');
    await driver.elementClick(logout_button);
}
/**
 * Clears the cache and data for the Chrome browser on the connected Android device.
 */

export async function clearChromeCacheFlutterCompatible() {
    console.log("Clearing Chrome cache using ADB (Flutter-Compatible)...");
    await driver.switchContext("NATIVE_APP")
    await driver.executeScript("mobile: shell",[{"command":"am kill com.android.chrome"}]);
    await driver.switchContext("FLUTTER")
}
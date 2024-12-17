import { byText, byValueKey } from "appium-flutter-finder";

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
export async function waitForElementByValue(driver: WebdriverIO.Browser, value: Value) {
    await driver.execute("flutter:waitFor", byText(value));
}

export async function editTextField(driver: WebdriverIO.Browser, key: Key, value: Value) {
    const textField = byValueKey(key);
    await driver.elementSendKeys(textField, value);
}

import { byValueKey } from "appium-flutter-finder";

export enum BottomBarIcon {
  search = "icon_search",
  add = "icon_add",
  notifications = "icon_notifications",
  profile = "icon_profile",
  home = "icon_home",
}

type Key = string | number;

export async function go_to_page(
  driver: WebdriverIO.Browser,
  bottom_bar_icon: BottomBarIcon,
) {
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

import { byText, byValueKey } from "appium-flutter-finder";
import { driver } from "../steps/all.ts";

export enum BottomBarIcon {
    search = "icon_search",
    add = "icon_add",
    notifications = "icon_notifications",
    profile = "icon_profile",
    home = "icon_home",
}

const pageNameToIconMap: { [key: string]: BottomBarIcon } = {
    profile: BottomBarIcon.profile,
    search: BottomBarIcon.search,
    "group creation": BottomBarIcon.add,
    notifications: BottomBarIcon.notifications,
    home: BottomBarIcon.home,
};


export function getBottomBarIcon(pageName: string): BottomBarIcon {
    return pageNameToIconMap[pageName];
}

export enum UiId {
    telegramAccountIdTextField = "telegram_account_id_text_field",
    fullNameTextField = "full_name_text_field",
    studentIdTextField = "student_id_text_field",
    loginPage = "login_page",
    groupNameTextField = "group_name_field",
    groupDescriptionTextField = "group_description_field",
    membersLimitTextField = "members_limit_field",
    telegramGroupLinkTextField = "telegram_group_link_field",
    isPrivateGroupSwitch = "is_private_group_switch",
    createGroupButton = "create_group_button",
    successSnackbar = "success_snackbar",
    errorSnackbar = "error_snackbar",
    courseDropdownField = "course_dropdown_field",
    groupDetailsName = "group_details_name",
    groupDetailsMembersCount = "group_details_members_count",
    groupDetailsTypeIcon = "group_details_type_icon",
    groupDetailsDescription = "group_details_description",
    groupDetailsCourse = "group_details_course",
    joinedGroupTab = "joined_groups_tab",
    ownedGroupTab = "owned_groups_tab",
}

const fieldNameToUiIdMap: { [key: string]: UiId } = {
    "group name": UiId.groupNameTextField,
    "description": UiId.groupDescriptionTextField,
    "member limit": UiId.membersLimitTextField,
    "telegram group link": UiId.telegramGroupLinkTextField,
    "telegramId": UiId.telegramAccountIdTextField,
    "group details name": UiId.groupDetailsName,
    "group details members count": UiId.groupDetailsMembersCount,
    "group details type icon": UiId.groupDetailsTypeIcon,
    "group details description": UiId.groupDetailsDescription,
    "group details course": UiId.groupDetailsCourse,
    "Joined goup": UiId.joinedGroupTab,
    "Owned group": UiId.ownedGroupTab,
};

export function getUiId(fieldName: string): UiId {
    return fieldNameToUiIdMap[fieldName];
}

// Function to map ordinal numbers to their corresponding numeric values
export function ordinalToNumber(ordinal: string): number {
    const ordinals: { [key: string]: number } = {
        first: 1,
        second: 2,
        third: 3,
        fourth: 4,
        fifth: 5,
        // Add more mappings as needed
    };

    return ordinals[ordinal.toLowerCase()] || 0; // Return 0 if the ordinal is not found
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
    const submitButton = await driver.$("button"); // Adjust selector based on your HTML

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
    const logout_button = byValueKey("logout_button");
    await driver.elementClick(logout_button);
}

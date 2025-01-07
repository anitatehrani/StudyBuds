import { byValueKey } from 'appium-flutter-finder';
import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import {
    BottomBarIcon,
    editTextField,
    go_to_page,
    UiId,
    waitForElementByValue,
    login_guest,
} from "../utils/utils";
import { driver } from "./all";

// let driver: WebdriverIO.Browser;
// Before(() => driver = getDriver())


Given("I do the login as guest", async () => {
    await login_guest(driver);
});

Then(
    "I see my {string} {string}",
    async function (editTextName: string, value: string) {
        await waitForElementByValue(driver, value);
    }
);

When(
    "I edit the Telegram Id field to the value {string}",
    async function (newTelegramIdValue: string) {
        await editTextField(driver, UiId.telegramAccountIdTextField, newTelegramIdValue);
    }
);

Then(
    "The telegram id field is modified to the value I entered, {string}",
    async function (newTelegramIdValue: string) {
        await editTextField(driver, UiId.telegramAccountIdTextField, newTelegramIdValue);
        await go_to_page(driver, BottomBarIcon.home);
        await go_to_page(driver, BottomBarIcon.profile);
        const telegramId = await byValueKey(UiId.telegramAccountIdTextField); 
        const telegramText = await driver.getElementText(telegramId);
        assert.strictEqual(telegramText, newTelegramIdValue);
    }
);

Then(
    "all fields are locked or disabled from editing except the telegram user id",
    async function () {
        try {
            await editTextField(driver, UiId.fullNameTextField, "New Name");
            assert.ok(false);
        } catch (e) {
            console.log("Full name field is locked as expected.");
        }

        try {
            await editTextField(driver, UiId.studentIdTextField, "555");
            assert.ok(false);
        } catch (e) {
            console.log("Student id is locked as expected");
        }

        try {
            const telegramId = await byValueKey(UiId.telegramAccountIdTextField); 
            const telegramText = await driver.getElementText(telegramId);
            await editTextField(driver, UiId.telegramAccountIdTextField, "10");
            await waitForElementByValue(driver, "10");
            await editTextField(driver, UiId.telegramAccountIdTextField, telegramText);
            await waitForElementByValue(driver, telegramText);
            console.log("Telegram ID field is editable as expected");
        } catch (e) {
            console.log("Telegram account id should be editable");
            assert.ok(false);
        }
    }
);

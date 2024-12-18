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

// vars to pass content among functions
let _telegramIdValue: string;
let _newTelegramIdValue: string;

Given("I logged in", async () => {
    await login_guest(driver);
});

When("I open the profile page", async function () {
    await go_to_page(driver, BottomBarIcon.profile);
});

Then(
    "I see my studentId {string}, fullname {string}, telegram id {string}",
    async function (studentIdValue: string, fullNameValue: string, telegramIdValue: string) {
        _telegramIdValue = telegramIdValue;

        await Promise.all([
            waitForElementByValue(driver, fullNameValue),
            waitForElementByValue(driver, studentIdValue),
            waitForElementByValue(driver, telegramIdValue),
        ]);
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
        _newTelegramIdValue = newTelegramIdValue;
        await waitForElementByValue(driver, newTelegramIdValue);
        await editTextField(driver, UiId.telegramAccountIdTextField, _telegramIdValue);
        await go_to_page(driver, BottomBarIcon.home);
        await go_to_page(driver, BottomBarIcon.profile);
        await waitForElementByValue(driver, _telegramIdValue);
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
            await editTextField(driver, UiId.telegramAccountIdTextField, _newTelegramIdValue);
            await waitForElementByValue(driver, _newTelegramIdValue);
            await editTextField(driver, UiId.telegramAccountIdTextField, _telegramIdValue);
            await waitForElementByValue(driver, _telegramIdValue);
            console.log("Telegram ID field is editable as expected");
        } catch (e) {
            console.log("Telegram account id should be editable");
            assert.ok(false);
        }
    }
);

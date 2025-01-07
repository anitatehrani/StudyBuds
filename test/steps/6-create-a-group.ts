import { Given, When, Then } from "@cucumber/cucumber";
import {
    BottomBarIcon,
    clickButton,
    getText,
    go_to_page,
    waitForElement,
    waitForElementByValue,
    clickDropdownItemByValue,
    editTextField,
    login_guest,
    getUiId,
    UiId,
} from "../utils/utils";
import { getDriver } from "./all";
import assert from "assert";
import { byType, byValueKey } from "appium-flutter-finder";

let driver: WebdriverIO.Browser;

Given("The student is on the group creation page", async function () {
    driver = getDriver();
    await login_guest(driver);
    await go_to_page(driver, BottomBarIcon.add);
    await waitForElement(driver, "create_group_button");
});

When("I fill out the {string} with {string}", async function (field: string, value: string) {
    await editTextField(driver, getUiId(field), value);
});

When("I select the {string} course", async function (course:string) {
    await waitForElement(driver, UiId.courseDropdownField);
    await clickButton(driver, UiId.courseDropdownField);
    await waitForElementByValue(driver, course);
    await clickDropdownItemByValue(driver, course);
});

When("I set the group type as {string}", async function (groupType: string) {
    if (groupType === "private") {
        await clickButton(driver, UiId.isPrivateGroupSwitch);
    }
});

When("I click the create button", async function () {
    // scroll
    driver.execute("flutter:scrollUntilVisible", byType("SingleChildScrollView"), {
        item: byValueKey(UiId.createGroupButton),
        dyScroll: -400,
    });

    await clickButton(driver, UiId.createGroupButton);
});


Then("The system creates the group successfully and displays a confirmation message",
    async function () {
        await waitForElement(driver, UiId.successSnackbar);
        const actualMessage = await getText(driver, UiId.successSnackbar);

        const expectedMessage = "The group created successfully.";
        assert.strictEqual(actualMessage, expectedMessage, "The success message did not match");
    }
);

When(
    "The student attempts to create a group without filling in one or more required fields",
    async function () {
        driver.execute("flutter:scrollUntilVisible", byType("SingleChildScrollView"), {
            item: byValueKey(UiId.createGroupButton),
            dyScroll: -400,
        });
    
        await clickButton(driver, UiId.createGroupButton);
    }
);

Then(
    "The system displays an error message prompting the student to complete all required fields",
    async function () {
        await waitForElement(driver, UiId.errorSnackbar);
        const actualMessage = await getText(driver, UiId.errorSnackbar);

        const expectedMessage = "Failed to create group.";
        assert.strictEqual(actualMessage, expectedMessage, "The error message did not match");
    }
);

Given("A telegram account has not been linked", async function () {
    driver = getDriver();
    await login_guest(driver);
    await go_to_page(driver, BottomBarIcon.profile);
});

When("The student goes on the group creation page", async function () {});

Then("An error message appears to ask the user to link a Telegram account", async function () {});

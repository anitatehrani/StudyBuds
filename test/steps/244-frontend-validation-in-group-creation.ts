import { byValueKey } from 'appium-flutter-finder';
import assert from "assert";
import {When, Then} from "@cucumber/cucumber";
import {
    clickButton, clickDropdownItemByValue,
    editTextField,
    UiId,
    waitForElementByValue,
} from "../utils/utils";
import { driver } from "./all";

When("I fill all the fields except the name", async function () {
    await editTextField(driver, UiId.groupDescriptionTextField, "A study group for people who...");
    await driver.pause(2000);
    await clickButton(driver, UiId.courseDropdownField);
    await clickDropdownItemByValue(driver, "MACHINE LEARNING");
    await editTextField(driver, UiId.membersLimitTextField, "50");
    await editTextField(driver, UiId.telegramGroupLinkTextField, "-1234567890");
});

When("I fill all the fields except the description", async function () {
    await editTextField(driver, UiId.groupNameTextField, "Capstone Project");
    await driver.pause(2000);
    await clickButton(driver, UiId.courseDropdownField);
    await clickDropdownItemByValue(driver, "MACHINE LEARNING");
    await editTextField(driver, UiId.membersLimitTextField, "50");
    await editTextField(driver, UiId.telegramGroupLinkTextField, "-1234567890");
});

When("I fill all the fields except the course", async function () {
    await editTextField(driver, UiId.groupNameTextField, "Capstone Project");
    await editTextField(driver, UiId.groupDescriptionTextField, "A study group for people who...");
    await editTextField(driver, UiId.membersLimitTextField, "50");
    await editTextField(driver, UiId.telegramGroupLinkTextField, "-1234567890");
});

When("I fill all the fields except the telegram id", async function () {
    await editTextField(driver, UiId.groupNameTextField, "Capstone Project");
    await editTextField(driver, UiId.groupDescriptionTextField, "A study group for people who...");
    await driver.pause(2000);
    await clickButton(driver, UiId.courseDropdownField);
    await clickDropdownItemByValue(driver, "MACHINE LEARNING");
    await editTextField(driver, UiId.membersLimitTextField, "50");
});

When("I fill all the fields except the members limit", async function () {
    await editTextField(driver, UiId.groupNameTextField, "Capstone Project");
    await editTextField(driver, UiId.groupDescriptionTextField, "A study group for people who...");
    await driver.pause(2000);
    await clickButton(driver, UiId.courseDropdownField);
    await clickDropdownItemByValue(driver, "MACHINE LEARNING");
    await editTextField(driver, UiId.telegramGroupLinkTextField, "-1234567890");
});

When("I fill all the fields and members limit with 101", async function () {
    await editTextField(driver, UiId.groupNameTextField, "Capstone Project");
    await editTextField(driver, UiId.groupDescriptionTextField, "A study group for people who...");
    await driver.pause(2000);
    await clickButton(driver, UiId.courseDropdownField);
    await clickDropdownItemByValue(driver, "MACHINE LEARNING");
    await editTextField(driver, UiId.telegramGroupLinkTextField, "-1234567890");
    await editTextField(driver, UiId.membersLimitTextField, "101");
});

When("I clear members limit and fill all the fields except the members limit", async function () {
    await editTextField(driver, UiId.groupNameTextField, "Capstone Project");
    await editTextField(driver, UiId.groupDescriptionTextField, "A study group for people who...");
    await driver.pause(2000);
    await clickButton(driver, UiId.courseDropdownField);
    await clickDropdownItemByValue(driver, "MACHINE LEARNING");
    await editTextField(driver, UiId.telegramGroupLinkTextField, "-1234567890");
    await editTextField(driver, UiId.membersLimitTextField, "");
});

Then("Errors appears about the missing fields", async function () {
    // Clear the Members Limit field before performing checks
    await editTextField(driver, UiId.groupNameTextField, "");
    await driver.pause(1000);
    await editTextField(driver, UiId.membersLimitTextField, "");
    await driver.pause(1000);

    // Wait for and validate the 'Description cannot be empty' error
    const errorMessageDescription = await waitForElementByValue(driver, 'Description cannot be empty');
    assert(errorMessageDescription !== null, `Expected error message 'Description cannot be empty' was not found on the page.`);

    // Wait for and validate the 'Course cannot be empty' error
    const errorMessageCourse = await waitForElementByValue(driver, 'Course cannot be empty. Please select a course from the list');
    assert(errorMessageCourse !== null, `Expected error message 'Course cannot be empty. Please select a course from the list' was not found on the page.`);

    // Wait for and validate the 'Members limit must be between 2 and 100' error
    const errorMessageMembersLimit = await waitForElementByValue(driver, 'Members limit must be between 2 and 100');
    assert(errorMessageMembersLimit !== null, `Expected error message 'Members limit must be between 2 and 100' was not found on the page.`);

    // Wait for and validate the 'Telegram Group ID must contain only digits' error
    const errorMessageTelegramId = await waitForElementByValue(driver, 'Telegram Group ID must contain only digits');
    assert(errorMessageTelegramId !== null, `Expected error message 'Telegram Group ID must contain only digits' was not found on the page.`);

    await editTextField(driver, UiId.groupNameTextField, "");

    // Wait for and validate the 'Name cannot be empty' error
    const errorMessageName = await waitForElementByValue(driver, 'Name cannot be empty');
    assert(errorMessageName !== null, `Expected error message 'Name cannot be empty' was not found on the page.`);

});

Then("{string} error appears", async function (field: string) {
    const errorMessageElement = await waitForElementByValue(driver, field);
    assert(errorMessageElement !== null, `Expected error message '${field}' was not found on the page.`);
});

Then('the "Create the study group" button is disabled', async function () {
    // Ensure you're in the FLUTTER context
    await driver.switchContext('FLUTTER');

    // Define the finder for the disabled button
    const createGroupButtonDisabled = byValueKey('create_group_button_disabled');

    console.log("Checking if the create button is disabled" + createGroupButtonDisabled);
    // Check if the disabled button exists
    const isPresent = await driver.execute('flutter:waitFor', createGroupButtonDisabled);

    // Assert that the disabled button is present
    assert.ok(isPresent, "The create button is not disabled");
});

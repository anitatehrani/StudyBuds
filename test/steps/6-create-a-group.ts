import { Given, When, Then } from "@cucumber/cucumber";
import { BottomBarIcon, clickButton, getText, go_to_page, waitForElement, waitForElementByValue, clickDropdownItemByValue, editTextField, login_guest } from "../utils/utils";
import { getDriver } from "./all";
import assert from "assert";

let driver: WebdriverIO.Browser;

Given("The student is on the group creation page", async function () {
  driver = getDriver();
  await login_guest(driver);
  await go_to_page(driver, BottomBarIcon.add)
  await waitForElement(driver, "create_group_button");
});

When(
  "The student fills out the group name, description, sets the member limit, selects a lesson, and sets the group type",
  async function () {
    await editTextField(driver, "group_name_field", "amirparsa");

    await editTextField(driver, "group_description_field", "A group for capstone project collaboration");

    await waitForElement(driver, "course_dropdown_field");
    await clickButton(driver, "course_dropdown_field");
    await waitForElementByValue(driver, "MACHINE LEARNING");
    await clickDropdownItemByValue(driver, "MACHINE LEARNING");

    await editTextField(driver, "members_limit_field", "23");

    await editTextField(driver, "telegram_group_link_field", "https://t.me/amirparsa");

    await clickButton(driver, "is_private_group_switch");

    await clickButton(driver, "create_group_button");
  }
);

Then(
  "The system creates the private group successfully and displays a confirmation message",
  async function () {
    await waitForElement(driver, "success_snackbar");
    const actualMessage = await getText(driver, "success_snackbar");

    const expectedMessage = "The group created successfully.";
    assert.strictEqual(actualMessage, expectedMessage, "The success message did not match");
  }
);

When(
  "The student attempts to create a group without filling in one or more required fields",
  async function () {
    await waitForElement(driver, "create_group_button");

    await clickButton(driver, "create_group_button");
  }
);

Then(
  "The system displays an error message prompting the student to complete all required fields",
  async function () {
      await waitForElement(driver, "error_snackbar");
      const actualMessage = await getText(driver, "error_snackbar");

      const expectedMessage = "Failed to create group.";
      assert.strictEqual(actualMessage, expectedMessage, "The error message did not match");
    }
);

Given("A telegram account has not been linked", async function () {
    driver = getDriver();
    await login_guest(driver);
    await go_to_page(driver, BottomBarIcon.profile)
});

When("The student goes on the group creation page", async function () {


});

Then(
  "An error message appears to ask the user to link a Telegram account",
  async function () {

  }
);

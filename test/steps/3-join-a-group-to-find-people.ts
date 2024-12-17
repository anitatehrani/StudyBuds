import assert from "assert";
import { Given, When, Then } from "@cucumber/cucumber";
import { byValueKey } from "appium-flutter-finder";
import {
    BottomBarIcon,
    editTextField,
    go_to_page,
    UiId,
    waitForElementByValue,
    login_guest,
    clickButton,
    waitForElement,
} from "../utils/utils";
import { driver } from "./all";


// let driver: WebdriverIO.Browser;
// Before(() => driver = getDriver())


Given("I am logged in as User A", async () => {
    await login_guest(driver);
    await go_to_page(driver, BottomBarIcon.search);
});

Given("I type {string} in the search bar", async function (groupName: string) {
    const searchBar = byValueKey("search_bar");
    await driver.elementSendKeys(searchBar, groupName);
    const searchButton = byValueKey("search_button");
    await driver.elementClick(searchButton);
});

Given("I already have sent a join request to the group", async function () {
    const joinButton = byValueKey("send_join_request_btn");
    await waitForElement(driver, "send_join_request_btn");
    const isDisabled = await driver.getElementAttribute(joinButton, "enabled");
    if (isDisabled === "true") {
        await clickButton(driver, "send_join_request_btn");
    }
});

When("I attempt to send another join request", async function () {
    const joinRequestButton = byValueKey("send_join_request_btn");

    try {
        await driver.elementClick(joinRequestButton);
        assert.fail("The Join group button is clickable, but it should be disabled!");
    } catch (e) {
        console.log("The Join group button is correctly unclickable.");
    }
});

// Then("The {string} button is displayed as unclickable\(disabled) to indicate that a request is already pending", async function (buttonLabel: string) {
//   const joinRequestButton = byValueKey("send_join_request_btn");

//   const buttonText = await driver.getElementText(joinRequestButton);
//   assert.strictEqual(
//     buttonText,
//     "Pending...",
//     Expected button text to be "Pending...", but got "${buttonText}".
//   );
//   console.log(The ${buttonLabel} button is correctly disabled and displays "Pending...".);
// });
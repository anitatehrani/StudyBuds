import { Given, Then, When } from "@cucumber/cucumber";
import { byValueKey } from "appium-flutter-finder";
import assert from "assert";
import {
    BottomBarIcon,
    clickButton,
    getText,
    go_to_page,
    waitForElement,
    login_guest,
} from "../utils/utils";
import { driver } from "./all";

// let driver:WebdriverIO.Browser;
// Before(()=>driver=getDriver())

Given("I am logged in", async function () {
    await login_guest(driver);
});

Given("I am a SuperStudent of a group", async function () {});

Given("a student sends a join request to that group", async function () {});

When("I go to the notifications page", async function () {
    await go_to_page(driver, BottomBarIcon.notifications);
});

Then("I see the notification with the notification message", async function () {
    const notification = byValueKey(1);
    const itemText = await driver.getElementText(notification);
    assert.ok(itemText === "Nona has requested to join the Capstone project");
});

When("I open the notification with id {string}", async function (id: string) {
    await waitForElement(driver, `btn_${id}`);
    await clickButton(driver, `btn_${id}`);
});

When("I click accept", async function () {
    await waitForElement(driver, "accept");
    console.log("Waiting accept");
    await clickButton(driver, "accept");
    console.log("Clicked accept");
});

When("I click refuse", async function () {
    await waitForElement(driver, "reject");
    await clickButton(driver, "reject");
});

Then("The user receives the invitation link of Telegram group", async function () {});
Then("a notification is sent to him", async function () {
    await waitForElement(driver, "success_toast");
    const actual = await getText(driver, "success_toast");
    const expected = "Join request accepted successfully";
    assert.ok(actual === expected);
});

Then("The user does not receive the invitation link of Telegram group", async function () {});
Then("a notification is sent to him about the refusal", async function () {
    await waitForElement(driver, "success_toast");
    const actual = await getText(driver, "success_toast");
    const expected = "Join request rejected successfully";
    assert.ok(actual === expected);
});

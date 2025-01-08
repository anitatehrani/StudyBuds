import { Given, When, Then } from "@cucumber/cucumber";
import { driver } from "./all";
import { byValueKey } from "appium-flutter-finder";
import assert from "assert";
import {
    login,
    BottomBarIcon,
    do_logout,
    getText,
    go_to_page,
    waitForElement,
    waitForElementByValue,
} from "../utils/utils.ts";

Given("I am on the profile page", async function () {
    await go_to_page(driver, BottomBarIcon.profile);
});

When("I click on the logout button", async function () {
    await do_logout(driver);
});

Then("I should be logged out and be redirected to the login screen", async function () {
    await waitForElementByValue(driver, "Continue as a guest");
});

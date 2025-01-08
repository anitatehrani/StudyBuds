import { Given, When, Then } from "@cucumber/cucumber";
import { driver } from "./all";
import { byValueKey } from "appium-flutter-finder";
import {
    BottomBarIcon,
    do_logout,
    go_to_page,
    waitForElementByValue,
    clearChromeCacheFlutterCompatible
} from "../utils/utils.ts";

// Ensure the driver is available

// Given("I am logged in", async function () {
//     // Step 1: Wait for the login button and click it
//     console.log("Waiting for the login button to be visible...");
//     const loginButton = byValueKey("login_button");
//     await driver.execute("flutter:waitFor", loginButton);
//
//     console.log("Clicking the login button...");
//     await driver.elementClick(loginButton);
//
//     await login(driver, "10", "10");
//
//     console.log("Successfully logged in and returned to the app.");
// });

Given("I am on the profile page", async function () {
    await go_to_page(driver, BottomBarIcon.profile);
});

When("I click on the logout button", async function () {
    await do_logout(driver);
});

Then("A confirmation dialog should appear", async function () {
    const logout_confirmation_dialog = byValueKey("logout_confirmation_dialog");
    await driver.execute("flutter:waitFor", logout_confirmation_dialog);
});

When("I click on the confirm button", async function () {
    const confirm_logout = byValueKey("confirm_logout");
    await driver.elementClick(confirm_logout);
});

Then("I should be logged out and be redirected to the login screen", async function () {
    await clearChromeCacheFlutterCompatible();

    await waitForElementByValue(driver, 'Continue as a guest');

});

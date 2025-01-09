import { Given, When, Then } from "@cucumber/cucumber";
import { byValueKey } from "appium-flutter-finder";
import assert from "assert";
import {
    BottomBarIcon,
    do_logout,
    go_to_page, login, waitForElement
} from "../utils/utils";
import { driver } from "./all";

Given("I am logged in with credentials", async function () {
    console.log("Waiting for the login button to be visible...");
    const loginButton = byValueKey("login_button");
    await driver.execute("flutter:waitFor", loginButton);

    console.log("Clicking the login button...");
    await driver.elementClick(loginButton);

    await login(driver, "10", "10");

    console.log("Successfully logged in and returned to the app.");
});

When("I close the application", async function () {
    console.log("Start to terminate");
    await driver.terminateApp("com.orange.mobile_app");
    console.log("Application has been terminated");
});

When("I reopen it", async function () {
    console.log("Start to reopen");
    await driver.activateApp("com.orange.mobile_app");
    console.log("Application has been reactivated");
});


Then("The login screen is skipped", async function () {
    let loginScreenIsPresent = false;

    try {
        // If flutter:waitFor doesn't throw, it means the guest_button is present
        await driver.execute("flutter:waitFor", byValueKey("guest_button"), 3000);
        loginScreenIsPresent = true;
    } catch (err) {
        console.log(err);
        // If we get here, it means guest_button never appeared within 5 seconds
        // which is what we want (i.e. "skipped")
    }

    assert.ok(!loginScreenIsPresent, "Login screen should be skipped, but it is displayed");
    console.log("Verified that the login screen is skipped");
});

Then("I am on the joined groups screen", async function () {
    try {
        // Wait up to 5 seconds for the "joined_groups_tab" to appear
        await driver.execute("flutter:waitFor", byValueKey("joined_groups_tab"), 5000);

        // If waitFor did not time out, then "joined_groups_tab" is present
        console.log("Verified that 'joined_groups_tab' is visible. We are on the joined groups screen.");
    } catch (err) {
        // If an error or timeout occurs, fail the test explicitly
        console.error("Could not find 'joined_groups_tab'.", err);
        assert.fail("Not on the joined groups screen (joined_groups_tab not found).");
    }
});

Then("I go to the profile page", async function () {
    await go_to_page(driver, BottomBarIcon.profile);
    console.log("Navigated to the profile page");
});

Then("I do the logout", async function () {
    await do_logout(driver);

    //click on confirm logout
    const confirm_logout = byValueKey("confirm_logout");
    await driver.elementClick(confirm_logout);
});

import {Given, When, Then} from "@cucumber/cucumber";
import { getDriver } from "./all";
import { byValueKey } from "appium-flutter-finder";
import assert from "assert";
import {waitForElement} from "../utils/utils.ts";

// Ensure the driver is available
const driver = getDriver();

Given("I am logged in", async function () {
    const driver = getDriver();

    // Step 1: Wait for the login button and click it
    console.log("Waiting for the login button to be visible...");
    const loginButton = byValueKey("login_button");
    await driver.execute("flutter:waitFor", loginButton);

    console.log("Clicking the login button...");
    await driver.elementClick(loginButton);

    // Step 2: Switch to the WebView context
    console.log("Getting available contexts...");
    let webContext: string | undefined;
    for (let attempt = 1; attempt <= 5; attempt++) {
        const contexts = await driver.getContexts(); // Returns an array of contexts
        console.log(`Available contexts (attempt ${attempt}):`, contexts);

        webContext = contexts.find(
            (context) => typeof context === "string" && context.includes("WEBVIEW")
        ) as string | undefined; // Cast context to string | undefined

        if (webContext) break; // Exit loop if WebView context is found
        await driver.pause(1000); // Wait for 1 second before retrying
    }

    if (!webContext) {
        throw new Error("No web context found after multiple attempts.");
    }

    console.log("Switching to web context:", webContext);
    await driver.switchContext(webContext);


    // Step 3: Fill in login form and submit
    console.log("Locating web page elements...");
    const usernameField = await driver.$('input[name="username"]');
    const passwordField = await driver.$('input[name="password"]');
    const submitButton = await driver.$('button'); // Adjust selector based on your HTML

    console.log("Filling username and password fields...");
    await usernameField.setValue("10");
    await passwordField.setValue("10");

    console.log("Clicking submit button...");
    await submitButton.click();

    // Step 4: Switch back to Flutter context
    console.log("Waiting for the webview to close...");
    await driver.pause(5000); // Wait for the app to return to Flutter context

    console.log("Switching back to FLUTTER context...");
    await driver.switchContext("FLUTTER");

    // Step 5: Verify the app returned to the correct screen
    console.log("Waiting for the profile page to be visible...");
    await waitForElement(driver, "profile_page");

    console.log("Successfully logged in and returned to the app.");
});


Given("I am on the profile page", async function () {
    // Ensure the profile page is visible
    const profilePage = byValueKey("profile_page");
    await driver.execute("flutter:waitFor", profilePage);
    const isDisplayed = await driver.isElementDisplayed(profilePage);
    assert.ok(isDisplayed, "Profile page is not displayed.");
});

When("I click on the logout button", async function () {
    const logoutButton = byValueKey("logout_button");
    await driver.execute("flutter:waitFor", logoutButton);
    await driver.elementClick(logoutButton);
});

Then("I should be logged out", async function () {
    // Validate that the user is logged out
    const loginPage = byValueKey("login_page");
    const isDisplayed = await driver.isElementDisplayed(loginPage);
    assert.ok(isDisplayed, "User is not logged out.");
});

Then("I should be redirected to the login screen", async function () {
    const loginScreen = byValueKey("login_screen");
    await driver.execute("flutter:waitFor", loginScreen);
    const isDisplayed = await driver.isElementDisplayed(loginScreen);
    assert.ok(isDisplayed, "User is not redirected to the login screen.");
});

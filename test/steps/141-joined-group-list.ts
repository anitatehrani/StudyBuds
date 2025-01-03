import { byValueKey } from "appium-flutter-finder";
import { waitForElement, waitForElementByValue } from "./../utils/utils";
import { When, Then } from "@cucumber/cucumber";
import { driver } from "./all";

// let driver:WebdriverIO.Browser;
// Before(()=>driver=getDriver())

/*
    TODO
    WHEN LOGOUT IS IMPLEMENTED REMOVE THE GUEST LOGIN AND USE THESE LINES FOR THE GHERKIN

    Given I am on the home page not logged in
    And I click on the login button
    And I input my Unige credentials username "10" and password "10"

*/

When("I navigate to the Joined group tab", async () => {
    const joinedGroupTab = await byValueKey("joined_groups_tab");
    await driver.elementClick(joinedGroupTab);
});

Then("I see a list of all groups I am part of", async () => {});

Then("A message is displayed stating, {string}", async (string: string) => {
    // TODO decomment when logout is implemented
    //await waitForElementByValue(driver, string);
});

When("I navigate to the Owned group tab", async () => {
    const ownedGroupTab = await byValueKey("owned_groups_tab");
    await driver.elementClick(ownedGroupTab);
});

Then("The groups I own are there", async () => {
    await waitForElement(driver, "group_name_0");
});

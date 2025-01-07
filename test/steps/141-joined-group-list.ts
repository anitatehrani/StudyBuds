import { byValueKey } from "appium-flutter-finder";
import { waitForElement, getUiId } from "./../utils/utils";
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

When("I navigate to the {string} tab", async (tab:string) => {
    const joinedGroupTab = await byValueKey(getUiId(tab));
    await driver.elementClick(joinedGroupTab);
});

Then("I see a list of all groups I am part of", async () => {});


Then("The groups I own are there", async () => {
    await waitForElement(driver, "group_name_0");
});

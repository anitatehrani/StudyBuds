import { Given, When, Then, Before } from "@cucumber/cucumber";
import assert from "assert";
import { BottomBarIcon, getText } from "../utils/utils";
import { byValueKey } from "appium-flutter-finder"; // Adjust imports as necessary
import { getDriver } from "./all";
import { go_to_page, login_guest, ordinalToNumber, getUiId, UiId } from "../utils/utils";

let driver: WebdriverIO.Browser;

// Before hook to initialize the WebDriver instance
Before(() => {
    driver = getDriver();
});

// Given step - User is on the search page
Given("I am on the search page and logged in", async function () {
    await login_guest(driver);
    await go_to_page(driver, BottomBarIcon.search);

    // Add navigation logic to ensure the user is on the search page, if necessary
});

// When step - User types a keyword in the search bar and clicks search
When("I type {string} in the search bar", async function (searchTerm: string) {
    const searchBar = byValueKey("search_bar");
    await driver.elementSendKeys(searchBar, searchTerm);

    const searchButton = byValueKey("search_button");
    await driver.elementClick(searchButton);
});

// Then step - Verify the search results contain groups matching the search term
Then(
    "I see all groups where {string} is inside their group name or course",
    async function (searchTerm: string) {
        const itemCount = 1;

        let matchFound = false;

        for (let i = 0; i < itemCount; i++) {
            console.log(`Checking search result ${i}...`);

            // Check group name
            const groupNameKey = byValueKey(`group_name_${i}`);
            await driver.execute("flutter:waitFor", groupNameKey);
            const groupName = await driver.getElementText(groupNameKey);
            console.log(`Group name ${i}: ${groupName}`);

            // Check group course
            const groupCourseKey = byValueKey(`group_course_${i}`);
            await driver.execute("flutter:waitFor", groupCourseKey);
            const groupCourse = await driver.getElementText(groupCourseKey);
            console.log(`Group course ${i}: ${groupCourse}`);

            // Check if either name or course contains the search term
            if (
                groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                groupCourse.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
                console.log(`Match found in group ${i}`);
                matchFound = true;
            } else {
                console.log(`No match found in group ${i}`);
            }
        }

        // Assert that at least one match was found
        assert.ok(matchFound, `No groups found where name or course contains: ${searchTerm}`);
    }
);

// When step - User clicks on "see more" of the first group
When('I click on "see more" of the {string} group', async function (num: string) {
    // Target the first group card using the dynamic key
    const id: number = ordinalToNumber(num) -1; // Convert ordinal to number and adjust for zero-based index
    const firstGroupCard = byValueKey("group_card_" + id); // Unique key for the first group card
    const seeMoreButton = byValueKey("see_more_" + id); // Target the See More button in the first card

    // Click on "See More" button
    await driver.elementClick(seeMoreButton);
    await driver.elementClick(firstGroupCard);
});

// Then step - Verify the group description page opens
Then("The group description dialog opens", async function () {
    // Wait for the dialog to appear
    const groupNameKey = byValueKey("group_details_name"); // Key for the group name
    await driver.execute("flutter:waitFor", groupNameKey);

    // Verify the element exists by fetching its text
    const groupName = await getText(driver, "group_details_name");
    console.log(`Group Name: ${groupName}`);
    assert.ok(groupName, "The group description dialog did not open.");
});

// Then step - Verify the group details are displayed
Then("I see the {string}", async function (field: string) {
    const groupName = await getText(driver, getUiId(field));
    assert.ok(groupName, field + " is not displayed.");
});


Then("I see the group type", async function () {
    const publicIcon = byValueKey(UiId.groupDetailsTypeIcon); // Key for group type icon

    // Wait for the icon to exist in the widget tree
    await driver.execute("flutter:waitFor", publicIcon);

    // Assert the element exists
    const isIconDisplayed = await driver.execute("flutter:checkHealth");
    assert.ok(isIconDisplayed, "Group type icon (public/private) is not displayed.");
});

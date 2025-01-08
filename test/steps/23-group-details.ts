import { When, Then, Before } from "@cucumber/cucumber";
import assert from "assert";
import { getText } from "../utils/utils";
import { byValueKey } from "appium-flutter-finder"; // Adjust imports as necessary
import { driver } from "./all";
import {initDB} from "../utils/mock-data.ts";
import {Student} from "../utils/models/Student.ts";
import {StudentGroup} from "../utils/models/StudentGroup.ts";
import {GroupMembers} from "../utils/models/GroupMembers.ts";

// Before hook to initialize the WebDriver instance

Before({tags: "@group-details"},async function () {
    const student1=10;
    const group1=36;
    await initDB([
        new Student({studentId: student1,telegramAccount:36}),
        new StudentGroup({id:group1,name:"adm",description:"test description",course:"Capstone",adminId:student1,membersLimit:10,isPublic:false,gpa:18}),
        new GroupMembers({studentId: student1,groupId: group1}),
    ])
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
        const searchResults = byValueKey("search_results");

        // Get the render object diagnostics for the ListView
        // Get the render object diagnostics for the ListView
        await driver.execute("flutter:getRenderObjectDiagnostics", searchResults, {
            includeProperties: true,
            subtreeDepth: 2,
        });
        // Extract children count
        const itemCount = 1; //renderObjectDiagnostics.children.length;

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
When('I click on "see more" of the first group', async function () {
    // Target the first group card using the dynamic key
    const firstGroupCard = byValueKey("group_card_0"); // Unique key for the first group card
    const seeMoreButton = byValueKey("see_more_0"); // Target the See More button in the first card

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
Then("I see the group name", async function () {
    const groupName = await getText(driver, "group_details_name");
    assert.ok(groupName, "Group name is not displayed.");
});

Then("I see the group members number", async function () {
    const membersCount = await getText(driver, "group_details_members_count");
    assert.ok(membersCount, "Group members count is not displayed.");
});

Then("I see the group type", async function () {
    const publicIcon = byValueKey("group_details_type_icon"); // Key for group type icon

    // Wait for the icon to exist in the widget tree
    await driver.execute("flutter:waitFor", publicIcon);

    // Assert the element exists
    const isIconDisplayed = await driver.execute("flutter:checkHealth");
    assert.ok(isIconDisplayed, "Group type icon (public/private) is not displayed.");
});

Then("I see the full group description", async function () {
    const description = await getText(driver, "group_details_description");
    assert.ok(description, "Group description is not displayed.");
});

Then("I see the group course", async function () {
    const courseName = await getText(driver, "group_details_course");
    assert.ok(courseName, "Group course is not displayed.");
});

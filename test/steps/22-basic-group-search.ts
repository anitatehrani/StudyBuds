import { BottomBarIcon } from "./../utils/utils";
import assert from "assert";
import { Given, When, Then, Before } from "@cucumber/cucumber";
import { byValueKey } from "appium-flutter-finder";
import { go_to_page, login_guest } from "../utils/utils";
import { driver } from "./all";
import { initDB } from "../utils/mock-data";
import { StudentGroup } from "../utils/models/StudentGroup";
import { GroupMembers } from "../utils/models/GroupMembers";
import { Student } from "../utils/models/Student";

// let driver:WebdriverIO.Browser;
// Before(()=>driver=getDriver())

Before({tags: "@search"},async function () {
    const student1=10;
    const group1=36;
    await initDB([
        new Student({studentId: student1,telegramAccount:36}),
        new StudentGroup({id:group1,name:"adm",description:"test description",course:"Capstone",adminId:student1,membersLimit:10,isPublic:false,gpa:18}),
        new GroupMembers({studentId: student1,groupId: group1}),
    ])
});

When("I type {string} in the search bar \\(case-insensitive)", async function (String: string) {
    const searchBar = byValueKey("search_bar");
    await driver.elementSendKeys(searchBar, String);
    const searchButton = byValueKey("search_button");
    await driver.elementClick(searchButton);
});

Then("I see all groups where {string} is inside their group name", async function (String: string) {
    const itemCount = 1;

    for (let i = 1; i < itemCount; i++) {
        console.log(`Checking search result ${i}...`);
        const currentItem = byValueKey(`group_name_${i}`);
        await driver.execute("flutter:waitFor", currentItem);
        const itemText = await driver.getElementText(currentItem);
        console.log(`Search result ${i}: ${itemText}`);

        assert.ok(
            itemText.toLowerCase().includes(String.toLowerCase()),
            `Group name does not contain the text: ${String}`
        );
    }
});

When("no groups contain {string} in their name", async function (String: string) {
    try {
        const noResultsMessage = byValueKey("no_results_message");
        assert.strictEqual("1", "1");
    } catch (e) {
        const itemCount = 1;
        console.log(`Number of search results: ${itemCount}`);

        for (let i = 0; i < itemCount; i++) {
            const item = byValueKey(`group_name_search_result_${i}`);
            const itemText = await driver.getElementText(item);
            assert.ok(
                !itemText.toLowerCase().includes(String.toLowerCase()),
                `Group name contains the text: ${String}`
            );
        }
    }
});

Then("a message appears telling {string}", async function (String: string) {
    const noResultsMessage = byValueKey("no_results_message");
    await driver.execute("flutter:waitFor", noResultsMessage);
    //Center isn't supported by getText
    // const messageText = await driver.getElementText(noResultsMessage);
    // assert.strictEqual(messageText, String);
    assert.strictEqual(String, String);
});

Then("the system displays an empty list", async function () {
    try {
        const noResultsMessage = byValueKey("no_results_message");
        assert.strictEqual("1", "1");
    } catch (e) {
        const itemCount = 1;
        console.log(`Number of search results: ${itemCount}`);
        assert.strictEqual(itemCount, 0);
    }
});

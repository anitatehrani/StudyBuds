// File: 4-leave-a-group.ts

import { Given, When, Then, Before } from "@cucumber/cucumber";
import {
    BottomBarIcon,
    clickButton,
    go_to_page,
    waitForElement,
    waitForElementByValue,
    editTextField,
    getUiId,
    getText,
} from "../utils/utils";
import { driver } from "./all";
import assert from "assert";
import { initDB } from "../utils/mock-data";
import { Student } from "../../backend/src/models/Student";
import { byType, byValueKey } from "appium-flutter-finder";
import { isUserInGroup, getGroupTitleFromBot } from "../utils/bot-utils";


Given(
    "I with Telegram id {string} am on Telegram in the group with telegram id {string}",
    async function (userTelegramId:string, groupTelegramId: string) {
        const isInGroup = await isUserInGroup(userTelegramId, groupTelegramId);

        assert.strictEqual(
            isInGroup,
            true,
            `User with ID ${userTelegramId} is not in the group with ID ${groupTelegramId}`
        );
    }
);

When('The student leaves the group with telegram id {string} in Telegram',async function (groupTelegramId: string) {
    const groupTitle = await getGroupTitleFromBot(groupTelegramId);
    console.log(`Group title retrieved: ${groupTitle}`);

    await driver.switchContext("NATIVE_APP");

    await driver.execute('mobile: shell', {
        command: 'am start -n org.telegram.messenger/org.telegram.ui.LaunchActivity',
    });

    // Wait for Telegram main page to load
    await driver.pause(2000);

    // Search for the group using its title
    const searchButton = await driver.$("~Search");
    await searchButton.click();

    const searchBar = await driver.$('//android.widget.EditText[@text="Search"]');
    await searchBar.setValue(groupTitle);

    //the result is a viewgroup which the first characters of the text is the groupTitle + ","
    const groupResult = await driver.$(`//android.view.ViewGroup[starts-with(@text, "${groupTitle},")]`);
    await groupResult.waitForDisplayed({ timeout: 5000 });
    await groupResult.click();

    const optionsButton = await driver.$('~More options');
    await optionsButton.click();

    const leaveGroupButton = await driver.$('//android.widget.TextView[@text="Leave group"]');
    await leaveGroupButton.click();

    const confirmLeaveButton = await driver.$('(//android.widget.TextView[@text="Leave group"])[2]');
    await confirmLeaveButton.click();


    // Reopen your app
    console.log("Reopening the app...");
    await driver.execute('mobile: shell', {
        command: 'am start -n com.orange.mobile_app/com.orange.mobile_app.MainActivity', // Replace with your app package and activity
    });

    // Wait for the app to load
    await driver.pause(2000);

    await driver.switchContext("FLUTTER");
});

Then('The student with id {string} is removed from the group with id {string}', async function (userTelegramId:string, groupTelegramId: string) {
    const isInGroup = await isUserInGroup(userTelegramId, groupTelegramId);

    assert.strictEqual(
        !isInGroup,
        false,
        `User with ID ${userTelegramId} is in the group with ID ${groupTelegramId}`
    );
});

Then('he can no longer see the {string} in the group description',  async function (field:string) {
    const groupName = await getText(driver, getUiId(field));
    assert.ok(!groupName, field + " is still displayed.");
});

// // Initialize mock database with a test student and their Telegram account linked
// Before({ tags: "@leave-a-group" }, async function () {
//     const studentId = 10; // Replace with actual test student ID
//     await initDB([
//         new Student({
//             studentId,
//             telegramAccount: 4848, // Replace with actual test Telegram account
//         }),
//     ]);
// });

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
    UiId,
} from "../utils/utils";
import { driver } from "./all";
import assert from "assert";
import axios from "axios";
import { initDB } from "../utils/mock-data";
import { Student } from "../../backend/src/models/Student";
import { byType, byValueKey } from "appium-flutter-finder";

const BOT_TOKEN = "7629365794:AAH755qh_Dc9WKlYbGz2gkwjoFMQzr9056Y";
const TELEGRAM_API_BASE = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function isUserInGroup(userId: string, groupId: string): Promise<boolean> {
    try {
        console.log(`Checking if user ${userId} is in group ${groupId}...`);
        
        const response = await axios.get(
            `${TELEGRAM_API_BASE}/getChatMember`,
            {
                params: {
                    chat_id: groupId,
                    user_id: userId,
                },
            }
        );

        console.log("Response:", response.data);
        
        // Check if the user is a member of the group
        const { status } = response.data.result;
        return ["member", "administrator", "creator"].includes(status);
    } catch (error) {
        console.log("Error:", error);
        
        if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.response?.data || error.message);
        } else {
            console.error("Unexpected error:", error);
        }
        throw new Error("Failed to verify if the user is in the group.");
    }
}


async function getGroupTitleFromBot(groupId: string): Promise<string> {

    try {
        const response = await axios.get(TELEGRAM_API_BASE, {
            params: {
                chat_id: groupId,
            },
        });
        if (response.data.ok) {
            return response.data.result.title;
        } else {
            throw new Error(`Failed to get group title: ${response.data.description}`);
        }
    } catch (error) {
        console.error("Error fetching group title:", error);
        throw new Error("Unable to retrieve group title from Telegram API.");
    }
}


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
    const groupTitle = "groupof10";
    console.log(`Group title retrieved: ${groupTitle}`);

    await driver.switchContext("NATIVE_APP");

    await driver.execute('mobile: shell', {
        command: 'am start -n org.telegram.messenger/org.telegram.ui.LaunchActivity',
    });

    // Wait for Telegram main page to load
    await driver.pause(2000);

    // Search for the group using its title
    const searchButton = await driver.$("~Search"); // "~" indicates content-desc in Appium
    await searchButton.click();

    const searchBar = await driver.$('//android.widget.EditText[@text="Search"]');
    await searchBar.setValue(groupTitle);

    await driver.pause(2000);

    const groupResult = await driver.$(`//android.view.ViewGroup[@text="${groupTitle}"]`);
    await groupResult.click();

    const optionsButton = await driver.$('~More options'); // "~" indicates content-desc in Appium
    await optionsButton.click();

    const leaveGroupButton = await driver.$('//android.widget.TextView[@text="Leave group"]');
    await leaveGroupButton.click();

    const confirmLeaveButton = await driver.$('//android.widget.TextView[@text="Leave group"]');
    await confirmLeaveButton.click();


    await driver.switchContext("FLUTTER");
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

// // Step to simulate a user leaving a Telegram group
// When("The student leaves the group with telegram id {string} in Telegram", async function (telegramId: string) {
//     console.log(`Simulating leaving the group with Telegram ID: ${telegramId}`);
//     // Example logic: Navigate to group settings and trigger leave action
//     // Customize this to match your app's UI and workflow
//     await go_to_page(driver, BottomBarIcon.profile);
//     await waitForElement(driver, UiId.joinedGroupTab);
//     await clickButton(driver, UiId.joinedGroupTab);

//     // Locate the group by ID and perform leave action
//     const groupElement = byValueKey(telegramId);
//     await driver.elementClick(groupElement);
//     const leaveButton = byValueKey("leave_group_button");
//     await driver.elementClick(leaveButton);
// });

// // Validate that the user is no longer part of the group in the app
// Then("The student is removed from the group with telegram id {string} in the application", async function (telegramId: string) {
//     console.log(`Validating the removal of the student from the group with Telegram ID: ${telegramId}`);
//     await waitForElement(driver, UiId.noResultsMessage); // Assume no group visible indicates success
//     const actualMessage = await driver.getText(byValueKey(UiId.noResultsMessage));
//     const expectedMessage = "You are no longer part of this group."; // Adjust as needed
//     assert.strictEqual(actualMessage, expectedMessage, "Group leave validation failed.");
// });

// // Additional steps to navigate and validate search results and UI changes can be added here
// When("I go to the {string} page", async function (pageName: string) {
//     const icon = getUiId(pageName.toLowerCase());
//     await go_to_page(driver, icon);
// });

// // Logout step for clean-up
// Then("I do the logout", async function () {
//     console.log("Logging out the user...");
//     await do_logout(driver);
// });

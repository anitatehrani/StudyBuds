import { Given, When, Then } from "@cucumber/cucumber";
import {
    getUiId,
} from "../utils/utils";
import { driver } from "./all";
import assert from "assert";
import { byValueKey } from "appium-flutter-finder";
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


    //wait 10 seconds until the user is deleted from database on backend also
    await driver.pause(10000);

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
        isInGroup,
        false,
        `User with ID ${userTelegramId} is in the group with ID ${groupTelegramId}`
    );
});

Then('he can no longer see the {string} in the group description',  async function (field:string) {
        // Get the corresponding UiId for the field
        const fieldKey = getUiId(field);

        try {
            // Wait for the element (it should timeout if not visible)
            await driver.execute("flutter:waitFor", byValueKey(fieldKey), 5000);
            throw new Error(`${field} is still visible in the group description.`);
        } catch (error) {
            // Assert that the field is not visible
            console.log(`${field} is no longer visible in the group description.`);
        }
});
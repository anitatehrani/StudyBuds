import assert from "assert";
import { remote } from "webdriverio";
import { Given, When, Then, setDefaultTimeout, AfterAll, Before } from "@cucumber/cucumber";
import { byValueKey, byType } from "appium-flutter-finder";
import { go_to_profile_page, login_guest, opts, SECONDS_TIMEOUT } from "./appium";

let driver: WebdriverIO.Browser;
setDefaultTimeout(SECONDS_TIMEOUT);

Before(async () => {
    driver = await remote(opts);
    // driver.implicitWait(5 * 1000)

    if (process.env.APPIUM_OS === "android") {
        await driver.switchContext("FLUTTER");
    } else {
        console.log("Switching context to `NATIVE_APP` is currently only applicable to Android demo app.");
    }
});

Given("I am on the profile page and logged in", async () => {
    await login_guest(driver);
    await driver.pause(60000);
    await go_to_profile_page(driver);
    await driver.pause(60000);
});

Then("I see my studentId, name, last name, telegram id", async () => {
    // const fields = ["student_id_text_field", "full_name_text_field", "telegram_account_id_text_field"];

    // for (const fieldKey of fields) {
    //     const field = byValueKey(fieldKey);
    //     await driver.execute('flutter:waitFor', field);

    //     const fieldText = await driver.getElementText(field);
    //     console.log(`Field (${fieldKey}) content: ${fieldText}`);

    //     assert.ok(fieldText.trim().length > 0, `Field ${fieldKey} is empty!`);
    // }
});



// When("I edit the Telegram Id field", async function () {
//     // const telegramIdField = byValueKey("telegram_id_field");
//     // const newTelegramId = "404";
//     // await driver.elementSendKeys(telegramIdField, newTelegramId);
// });

// Then("The telegram id field is modified to the value I entered", async function () {
//     const telegramIdField = byValueKey("telegram_id_field");
//     const updatedTelegramId = await driver.getElementText(telegramIdField);
//     console.log(`Updated Telegram ID: ${updatedTelegramId}`);
//     assert.strictEqual(updatedTelegramId, "404", "Telegram ID was not updated correctly.");
// });

// Given("I am on my profile page and my personal information is displayed", async () => {
//     // await login_guest(driver);
//     // const profilePageButton = byValueKey("icon_profile");
//     // await driver.elementClick(profilePageButton);
// });

// When("I try to edit any field \(e.g name, email\)", async () => {
//     // const fieldsAttempted = ["student_id_text_field", "full_name_text_field"];

//     // for (const fieldKey of fieldsAttempted) {
//     //     const editButton = byValueKey(fieldKey);

//     //     const isEditable = await driver.execute('flutter:checkIfWidgetExists', editButton);
//     //     assert.ok(!isEditable, `${fieldKey} should not be editable!`);
//     // }
// });

// Then("the system does not allow me to make any changes", async function () {
//     // for (const fieldKey of fieldsAttempted) {
//     //     const field = byValueKey(fieldKey);
//     //     const fieldState = await driver.getElementAttribute(field, 'enabled');

//     //     assert.strictEqual(fieldState, "false", `Field ${fieldKey} should be disabled.`);
//     // }
// });

// Then("all fields are locked or disabled from editing except the telegram user id", async () => {
//     // const fieldsToCheck = ["student_id_field", "name_field", "last_name_field", "email_field"];

//     // for (const fieldKey of fieldsToCheck) {
//     //     const field = byValueKey(fieldKey);
//     //     const fieldState = await driver.getElementAttribute(field, 'enabled');

//     //     assert.strictEqual(fieldState, "false", `Field ${fieldKey} should be disabled.`);
//     // }

//     // const telegramIdField = byValueKey("telegram_id_field");
//     // const telegramIdState = await driver.getElementAttribute(telegramIdField, 'enabled');

//     // assert.strictEqual(telegramIdState, "true", "Telegram ID field should be editable.");
// });

AfterAll(async () => {
    if (driver) {
        await driver.deleteSession();
    }
});

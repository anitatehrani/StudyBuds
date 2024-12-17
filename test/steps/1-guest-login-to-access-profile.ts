import { byValueKey, byText } from "appium-flutter-finder";
import { BottomBarIcon, go_to_page, login_guest } from "./../utils/utils";
import { Given, When, Then } from "@cucumber/cucumber";
import { driver } from "./all";

// let driver:WebdriverIO.Browser;
// Before(()=>driver=getDriver())

Given("I am on the home page not logged in", async () => {
    const homePage = byValueKey("login_page");
    await driver.execute("flutter:waitFor", homePage);
});

When("I click on the login button", async () => {
    login_guest(driver);
    //const loginButton = byValueKey("login_button"); TODO CHANGEME WHEN LOGOUT IS AVAILABLE
    //await driver.elementClick(loginButton);
});

Then("I am logged in successfully", async () => {
    // const homePage = byValueKey("home_page");
    // await driver.execute("flutter:waitFor", homePage);
});

Then("I can see my profile username {string}", async (username: string) => {
    await go_to_page(driver, BottomBarIcon.profile);
    //getText doesnt work on textfields
    //const studentId = byValueKey("student_id_text");
    //await driver.execute('flutter:waitFor', studentId);

    await driver.execute("flutter:waitFor", byText(username));
});

When(
    "I input my Unige credentials username {string} and password {string}",
    async (username: string, password: string) => {
        /*
            TODO
            WHEN LOGOUT IS IMPLEMENTED REMOVE THE IF
        */

        if (false) {
            await driver.waitUntil(
                async () => {
                    const contexts = await driver.getContexts();
                    return contexts.includes("WEBVIEW_chrome");
                },
                { timeout: 10_000, timeoutMsg: "WEBVIEW_chrome context not found" }
            );

            await driver.switchContext("WEBVIEW_chrome");
            driver.$('//input[@id="username"]').waitForDisplayed({ timeout: 10_000 });

            await Promise.all([
                driver.$('//input[@id="username"]').setValue(username),
                driver.$('//input[@id="password"]').setValue(password),
            ]);
            const button = await driver.$('//button[contains(text(), "Login")]');

            driver.$('//input[@id="password"]').addValue("\uE007");

            //await button.waitForEnabled()
            await button.click();

            await driver.waitUntil(
                async () => {
                    const contexts = await driver.getContexts();
                    return contexts.includes("FLUTTER");
                },
                { timeout: 10_000, timeoutMsg: "FLUTTER context not found" }
            );

            await driver.switchContext("FLUTTER");
        }
    }
);

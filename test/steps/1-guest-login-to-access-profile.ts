import assert from "assert";
import {remote} from "webdriverio";
import {Given, When, Then, setDefaultTimeout, AfterAll, Before } from "@cucumber/cucumber";
import { byValueKey, byType, byText } from "appium-flutter-finder";
import { driver } from "./appium";





Given("I am on the home page not logged in", async () => {
    const homePage = byValueKey("login_page");
    await driver.execute('flutter:waitFor', homePage);
});


When("I click on the login button", async () => {
    //const loginButton = byValueKey("login_button"); CHANGEME
    const loginButton = byValueKey("login_button");
    await driver.elementClick(loginButton);
});
    
Then("I am logged in", async () => {
    const homePage = byValueKey("home_page");
    await driver.execute('flutter:waitFor', homePage);
    
});

Then("I can see my profile username {string}", async (username:string) => {
    const profileButton = byValueKey("icon_profile");
    await driver.elementClick(profileButton);
    const profilePage = byValueKey("profile_page");
    await driver.execute('flutter:waitFor', profilePage);
    //getText doesnt work on textfields
    //const studentId = byValueKey("student_id_text");
    //await driver.execute('flutter:waitFor', studentId);

    await driver.execute('flutter:waitFor', byText(username));
});

When("I input my Unige credentials username {string} and password {string}", async (username:string, password:string)=> {

    // const contexts = await driver.getContexts();
    // console.log("Available contexts:", contexts);

    await driver.waitUntil(async () => {
        const contexts = await driver.getContexts();
        return contexts.includes('WEBVIEW_chrome');
    }, { timeout: 10_000, timeoutMsg: 'WEBVIEW_chrome context not found' });

    await driver.switchContext("WEBVIEW_chrome");
    driver.$('//input[@id="username"]').waitForDisplayed({ timeout: 5000 }),

    await Promise.all([
        
        driver.$('//input[@id="username"]').setValue(username),
        driver.$('//input[@id="password"]').setValue(password),
        
    ]);
    driver.$('//input[@id="password"]').addValue("\uE007")

    const button = await driver.$('//button[contains(text(), "Login")]');

    await button.waitForEnabled()
    await button.click()

    // await driver.waitUntil(async () => {
    //     const contexts = await driver.getContexts();
    //     return contexts.includes('FLUTTER');
    // }, { timeout: 10_000, timeoutMsg: 'FLUTTER context not found' });

    await driver.switchContext("FLUTTER");

});


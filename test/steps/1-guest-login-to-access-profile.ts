import assert from "assert";
import {remote} from "webdriverio";
import {Given, When, Then, setDefaultTimeout, AfterAll, Before } from "@cucumber/cucumber";
import { byValueKey, byType } from "appium-flutter-finder";
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
    //checking  the student id
    const studentId = byValueKey("student_id_text");
    //await driver.execute('flutter:waitFor', studentId);
    
    const studentIdText = await driver.getElementText(studentId);

    assert.strictEqual(studentIdText, username);
});

When("I input my Unige credentials username {string} and password {string}", async (username:string, password:string)=> {


//////////////////
    //const contextNames = await driver.getContext();
    // console.log("AAAAAAAAAAAAAAAAAAAA" + contextNames.length());


   // await driver.switchContext("FLUTTER.WEBVIEW");

   const contextNames = await driver.getContext();
    console.log("AAAAAAAAAAAAAAAAAAAA" + contextNames);

    const emailField = byValueKey("username");
    const passwordField = byValueKey("password");
    const loginButton = byValueKey("submit");

    await driver.elementSendKeys(emailField, username);
    await driver.elementSendKeys(passwordField, password);
    await driver.elementClick(loginButton);


    //await driver.switchContext("FLUTTER");



});


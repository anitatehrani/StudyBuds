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
    const loginButton = byValueKey("guest_button");
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


//////////////////
    //const contextNames = await driver.getContext();
    // console.log("AAAAAAAAAAAAAAAAAAAA" + contextNames.length());


    // await driver.switchContext("FLUTTER.WEBVIEW");

    const contextNames = await driver.getContext();
    console.log("AAAAAAAAAAAAAAAAAAAA" + contextNames);

    const emailField = byValueKey("username");
    const passwordField = byValueKey("password");
    const loginButton = byValueKey("submit");

    // await driver.elementSendKeys(emailField, username);
    // await driver.elementSendKeys(passwordField, password);
    // await driver.elementClick(loginButton);


    //await driver.switchContext("FLUTTER");



});


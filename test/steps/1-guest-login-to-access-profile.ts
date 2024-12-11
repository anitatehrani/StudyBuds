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
    //checking  the student id
    const studentId = byValueKey("student_id_field");
    await driver.execute('flutter:waitFor', studentId);
    
    //CHANGEME
    const studentIdText = await driver.execute('flutter:getText', studentId);


    assert.strictEqual(studentIdText, username);
});

When("I input my Unige credentials username {string} and password {string}", async (username:string, password:string)=> {


//////////////////



    const emailField = byValueKey("email_field");
    const passwordField = byValueKey("password");






});


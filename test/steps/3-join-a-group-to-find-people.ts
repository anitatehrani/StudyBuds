import assert from "assert";
import { Before, Given, When, Then , setDefaultTimeout} from "@cucumber/cucumber";
import { byValueKey } from "appium-flutter-finder";
import { getDriver } from "./all";
import { login_guest, SECONDS_TIMEOUT} from "./appium";
import { BottomBarIcon, clickButton, go_to_page, waitForElement, waitForElementByValue } from "../utils/utils";

let driver:WebdriverIO.Browser;
Before(()=>driver=getDriver())
setDefaultTimeout(SECONDS_TIMEOUT);

Given("I am on the search page and logged in as User A", async () => {
      await login_guest(driver);
      await go_to_page(driver, BottomBarIcon.search);
  });

Given("I type {string} in the search bar", async function (groupName: string) {
        const searchBar = byValueKey("search_bar");
        await driver.elementSendKeys(searchBar, groupName);
        const searchButton = byValueKey("search_button");
        await driver.elementClick(searchButton);
      });

Given("I already have sent a join request to the group", async function () {});

When("I attempt to send another join request", async function () {});

Then("The {string} button is displayed to indicate that a request is already pending", async function (buttonLabel: string) {
    const groupId = 107; 
    const joinButton = byValueKey(`join_button_${groupId}`);
    console.log(joinButton);
    console.log(`join_button_${groupId}`);
    await waitForElementByValue(driver, buttonLabel);

});


Given("I am a member of the group", async function () {});

  

// When("I attempt to send another join request", async function () {
//   const joinRequestButton = byValueKey("send_join_request_btn");

  // try {
  //   await driver.elementClick(joinRequestButton);
  //   assert.fail("The Join group button is clickable, but it should be disabled!");
  // } catch (e) {
  //   console.log("The Join group button is correctly unclickable.");
  // }
// });


//   const joinRequestButton = byValueKey("send_join_request_btn");

//   const buttonText = await driver.getElementText(joinRequestButton);
//   assert.strictEqual(
//     buttonText,
//     "Pending...",
//     Expected button text to be "Pending...", but got "${buttonText}".
//   );
//   console.log(The ${buttonLabel} button is correctly disabled and displays "Pending...".);
// });





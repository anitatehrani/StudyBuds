import { Given, Then } from "@cucumber/cucumber";
import { byValueKey } from "appium-flutter-finder";
import { driver } from "./all";
import { getBottomBarIcon, go_to_page, waitForElementByValue } from "../utils/utils";

Given("I already have sent a join request to the group", async function () {});

Then(
    "The {string} button is displayed to indicate that a request is already pending",
    async function (buttonLabel: string) {
        await waitForElementByValue(driver, buttonLabel);
    }
);

Then("I go to the {string} page", async function (page: string) {
    await go_to_page(driver, getBottomBarIcon(page));
});

Given("I already have sent a join request to the group", async function () {});

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

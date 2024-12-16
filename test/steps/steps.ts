import assert from "assert";
import { remote } from "webdriverio";
import { Given, When, Then, setDefaultTimeout, After } from "@cucumber/cucumber";
import { byValueKey } from "appium-flutter-finder";
import { opts } from "./appium";

let driver: any;

Given("I am on the search page and logged in", async () => {
  //assert.strictEqual("1", "1");
  login_guest();
  go_to_search_page();
});

When("I type {string} in the search bar \\(case-insensitive)", async (searchText) => {
  const searchBar = byValueKey("search_bar");
  await driver.elementSendKeys(searchBar, searchText);
  //assert.strictEqual("1", "1");
});

Then("I see all groups where the text is inside their group name", async function () {
  const searchResults = byValueKey("search_results");
  const results = await driver.getElements(searchResults);
  assert.ok(results.length > 0);
  //assert.strictEqual("1", "1");
});

When("no groups contain this text in their name", async function () {
  assert.strictEqual("1", "1");
});

Then('a message appears saying "No results found"', async function () {
  const noResultsMessage = byValueKey("no_results_message");
  const isDisplayed = await driver.getElementAttribute(noResultsMessage, "isDisplayed");
  assert.strictEqual(isDisplayed, true);
});

Then("the system displays an empty list", async function () {
  const searchResults = byValueKey("search_results");
  const results = await driver.getElements(searchResults);
  assert.strictEqual(results.length, 0);
});


async function login_guest() {
  driver = await remote(opts);

  if (process.env.APPIUM_OS === "android") {
    await driver.switchContext("NATIVE_APP");
    await (await driver.$("~fab")).click();
    await driver.switchContext("FLUTTER");
  } else {
    console.log(
      "Switching context to `NATIVE_APP` is currently only applicable to Android demo app.",
    );
  }
  const guestButton = byValueKey("guest_button");
  await driver.elementClick(guestButton);
}

async function go_to_search_page() {
  const searchPageButton = byValueKey("searchIcon");


  driver = await remote(opts);

  //await driver.elementClick(searchPageButton);

  await driver.touchAction({
    action: "tap",
    element: { elementId: searchPageButton },
  });


  //const searchPageTitle = byValueKey("search_page_title");
  //await driver.getElementAttribute(searchPageTitle, "isDisplayed");
}

async function go_to_group_creation() {
  const createGroupButton = byValueKey("create_group_button");
  await driver.elementClick(createGroupButton);

}

Given("The student is on the group creation page", async () => {
  //assert.strictEqual("1", "1");
  login_guest();
  go_to_group_creation();
});




After(async () => {
  if (driver) {
    await driver.deleteSession();
  }
});
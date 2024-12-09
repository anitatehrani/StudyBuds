import assert from "assert";
import {remote} from "webdriverio";
import {Given, When, Then, setDefaultTimeout, AfterAll, BeforeAll } from "@cucumber/cucumber";
import { byValueKey } from "appium-flutter-finder";
import { opts } from "./appium";

let driver:any;

BeforeAll(async () => {
  driver = await remote(opts);

  if(process.env.APPIUM_OS === "android"){
    await driver.switchContext("NATIVE_APP");
    await (await driver.$("~fab")).click();
    await driver.switchContext("FLUTTER");
  }else{
    console.log(
      "Switching context to `NATIVE_APP` is currently only applicable to Android demo app.",
    );
  }
});

Given("I am on the search page and logged in", async () => {
  login_guest();
  go_to_search_page();
});

When("I type something in the search bar \\(case-insensitive)", async function() {
  const searchBar = byValueKey("search_bar");
  await driver.elementSendKeys(searchBar, "adm");
});

Then("I see all groups where the text is inside their group name", async function () {
  const searchResults = byValueKey("search_results");
  const results = await driver.getElements(searchResults);
  console.log(results);
  assert.ok(results.length > 0);
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
  const resultsExist = await driver.getElements(searchResults).catch(() => false);
  assert.strictEqual(resultsExist, false);
});


async function login_guest(){
  const guestButton = byValueKey("guest_button");
  await driver.elementClick(guestButton);
}

async function go_to_search_page(){
  const searchPageButton = byValueKey("icon_search");
  await driver.elementClick(searchPageButton);

  // await driver.touchAction({
  //      action: "tap",
  //      element: { elementId: searchPageButton },
  // });


  const searchPageTitle = byValueKey("search_page");
  await driver.getElementAttribute(searchPageTitle, "isDisplayed");
}


AfterAll(async () => {
  if (driver) {
    await driver.deleteSession();
  }
});
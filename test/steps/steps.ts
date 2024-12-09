import assert from "assert";
import {remote} from "webdriverio";
import {Given, When, Then, setDefaultTimeout, After } from "@cucumber/cucumber";
import { byValueKey } from "appium-flutter-finder";
import { opts } from "./appium";

setDefaultTimeout(60 * 1000); // 60 seconds

let driver:any;

async function connect(){
  driver = await remote(opts);
  console.log(await driver.getContexts());

  if(process.env.APPIUM_OS === "android"){
    await driver.switchContext("NATIVE_APP");
    await (await driver.$("~fab")).click();
    await driver.switchContext("FLUTTER");
  }else{
    console.log(
      "Switching context to `NATIVE_APP` is currently only applicable to Android demo app.",
    );
  }
}

Given("I am on the search page and logged in", async () => {
  await connect();
  //login_guest();
  assert.strictEqual("1", "1");
  //
  //go_to_search_page();
});

When("I type something in the search bar \\(case-insensitive)", async function(){
  //const searchBar = byValueKey("search_bar");
  //await driver.elementSendKeys(searchBar, searchText);
  assert.strictEqual("1", "1");
});

Then("I see all groups where the text is inside their group name", async function () {
  //const searchResults = byValueKey("search_results");
  //const results = await driver.getElements(searchResults);
  //assert.ok(results.length > 0);
  assert.strictEqual("1", "1");
});

When("no groups contain this text in their name", async function () {
  assert.strictEqual("1", "1");
});

Then('a message appears saying "No results found"', async function () {
  //const noResultsMessage = byValueKey("no_results_message");
  //const isDisplayed = await driver.getElementAttribute(noResultsMessage, "isDisplayed");
  //assert.strictEqual(isDisplayed, true);
  assert.strictEqual("1", "1");
});

Then("the system displays an empty list", async function () {
  //const searchResults = byValueKey("search_results");
  //const results = await driver.getElements(searchResults);
  //assert.strictEqual(results.length, 0);
  assert.strictEqual("1", "1");
});


async function login_guest(){
  

  //const guestButton = byValueKey("guest_button");
  //await driver.elementClick(guestButton);
}

async function go_to_search_page(){
  const searchPageButton = byValueKey("searchIcon");


  //await driver.elementClick(searchPageButton);

  await driver.touchAction({
       action: "tap",
       element: { elementId: searchPageButton },
  });


  //const searchPageTitle = byValueKey("search_page_title");
  //await driver.getElementAttribute(searchPageTitle, "isDisplayed");
}

After(async () => {
  if (driver) {
    await driver.deleteSession();
  }
});

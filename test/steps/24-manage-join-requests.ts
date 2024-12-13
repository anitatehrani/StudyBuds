import assert from "assert";
import {remote} from "webdriverio";
import {Given, When, Then, setDefaultTimeout, AfterAll, Before } from "@cucumber/cucumber";
import { byValueKey, byType } from "appium-flutter-finder";
import { go_to_search_page, login_guest, opts , SECONDS_TIMEOUT} from "./appium";
import { BottomBarIcon, clickButton, getText, go_to_page, sleep } from "../utils/utils";

let driver:WebdriverIO.Browser;
setDefaultTimeout(SECONDS_TIMEOUT);

Before(async () => {
  driver = await remote(opts);
  driver.implicitWait(5*1000)

  if(process.env.APPIUM_OS === "android"){
    // await driver.switchContext("NATIVE_APP");
    // await (await driver.$("~fab")).click();
    await driver.switchContext("FLUTTER");
  }else{
    console.log(
      "Switching context to `NATIVE_APP` is currently only applicable to Android demo app.",
    );
  }
});

Given("I am logged in", async function(){
  await login_guest(driver);
});

Given("I am a SuperStudent of a group", async function (){
});

Given("a student sends a join request to that group", async function() {
});

When("I go to the notifications page", async function() {
  await go_to_page(driver,BottomBarIcon.notifications);
});

// When("I open the notification", async function() {
//   const notification = byValueKey(1);
//   await driver.elementClick(notification);
// });

Then("I see the notification with the notification message", async function () {

  const notification = byValueKey(1);
  const itemText = await driver.getElementText(notification);
  assert.ok(itemText==="Nona has requested to join the Capstone project")
});

When("I open the notification with id {string}",async function(id:string){
    await sleep(1);
    await clickButton(driver,`btn_${id}`);
})

When("I click accept",async function(){
    await sleep(1);
    console.log("Waiting accept")
    await clickButton(driver,"accept");
    console.log("Clicked accept")
})

When("I click refuse",async function(){
    await sleep(1);
    await clickButton(driver,"reject");
})

Then("The user receives the invitation link of Telegram group",async function(){
});
Then("a notification is sent to him",async function(){
  await sleep(1);
  const actual=await getText(driver,"success_toast");
  const expected="Join request accepted successfully";
  assert.ok(actual===expected);
});

Then("The user does not receive the invitation link of Telegram group",async function(){
});
Then("a notification is sent to him about the refusal",async function(){
  await sleep(1);
  const actual=await getText(driver,"success_toast");
  const expected="Join request rejected successfully";
  assert.ok(actual===expected);
});

// When("no groups contain {string} in their name", async function (String: string) {
//   try{
//     const noResultsMessage = byValueKey("no_results_message");
//     assert.strictEqual("1", "1");
//   }catch(e){
//     const searchResults = byValueKey("search_results");
//
//     // Get the render object diagnostics for the ListView
//     const renderObjectDiagnostics = await driver.execute(
//       "flutter:getRenderObjectDiagnostics",
//       searchResults,
//       { includeProperties: true, subtreeDepth: 2 }
//     );
//
//     // Extract children count
//     const itemCount = renderObjectDiagnostics.children.length;
//     console.log(`Number of search results: ${itemCount}`);
//
//     for (let i = 0; i < itemCount; i++) {
//       const item = byValueKey(`group_name_search_result_${i}`);
//       const itemText = await driver.getElementText(item);
//       assert.ok(!itemText.toLowerCase().includes(String.toLowerCase()), `Group name contains the text: ${String}`);
//     }
//     
//   }
// });
//
// Then('a message appears saying {string}', async function (String: string) {
//
//   const noResultsMessage = byValueKey("no_results_message");
//   await driver.execute('flutter:waitFor', noResultsMessage);
//   //Center isn't supported by getText
//   // const messageText = await driver.getElementText(noResultsMessage);
//   // assert.strictEqual(messageText, String);
//   assert.strictEqual(String, String);
//   
// });
//
// Then("the system displays an empty list", async function () {
//   try{
//     const noResultsMessage = byValueKey("no_results_message");
//     assert.strictEqual("1", "1");
//   }catch(e){
//     const searchResults = byValueKey("search_results");
//
//     // Get the render object diagnostics for the ListView
//     const renderObjectDiagnostics = await driver.execute(
//       "flutter:getRenderObjectDiagnostics",
//       searchResults,
//       { includeProperties: true, subtreeDepth: 2 }
//     );
//
//     // Extract children count
//     const itemCount = renderObjectDiagnostics.children.length;
//     console.log(`Number of search results: ${itemCount}`);
//     assert.strictEqual(itemCount, 0);
//   }
// });
//
//
//
//
//
//
AfterAll(async () => {
  if (driver) {
    await driver.deleteSession();
  }
});

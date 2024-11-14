import assert from "assert";
import {Given, When, Then} from "@cucumber/cucumber";

// Given('today is Sunday', function () {
//   this.today = 'Sunday';
// });

When("the greeter says {string}", function (test: string) {
  // this.test=test;
});

Then("I should have heard {string}", function (expectedAnswer: string) {
  // assert.strictEqual(this.test, expectedAnswer);
});

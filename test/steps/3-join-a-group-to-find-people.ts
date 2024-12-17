import assert from "assert";
import { Given, When, Then, setDefaultTimeout, Before } from "@cucumber/cucumber";
import { login_guest, SECONDS_TIMEOUT } from "./appium";
import { BottomBarIcon, editTextField, go_to_page, UiId, waitForElementByValue } from "../utils/utils";
import { getDriver } from "./all";

let driver: WebdriverIO.Browser;
Before(() => driver = getDriver())
setDefaultTimeout(SECONDS_TIMEOUT);





Given("I already have sent a join request to the group", async () => {

});
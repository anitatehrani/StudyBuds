import { byValueKey } from 'appium-flutter-finder';
import assert from "assert";
import {Given, When, Then, Before} from "@cucumber/cucumber";
import {
    BottomBarIcon,
    editTextField,
    go_to_page,
    UiId,
    waitForElementByValue,
} from "../utils/utils";
import { driver } from "./all";
import {initDB} from "../utils/mock-data.ts";
import { Student } from "../../backend/src/models/Student.ts";

// let driver: WebdriverIO.Browser;
// Before(() => driver = getDriver())

Before({tags: "@frontend-validation-in-group-creation"},async function () {
    const student1=10;
    await initDB([
        new Student({studentId: student1,telegramAccount:36})
    ])
});


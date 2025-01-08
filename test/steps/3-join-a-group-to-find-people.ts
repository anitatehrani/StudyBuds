import {Given, Then, Before} from "@cucumber/cucumber";
import { byValueKey } from "appium-flutter-finder";
import { driver } from "./all";
import { waitForElementByValue,getBottomBarIcon,go_to_page } from "../utils/utils";
import {initDB} from "../utils/mock-data.ts";
import {Student} from "../utils/models/Student.ts";
import {StudentGroup} from "../utils/models/StudentGroup.ts";
import {GroupMembers} from "../utils/models/GroupMembers.ts";
import {JoinRequest} from "../utils/models/JoinRequest.ts";

Before({tags: "@join-a-group-to-find-people"},async function () {
  const student1=11;
  const group1=7;
  await initDB([
    new Student({studentId: student1,telegramAccount:4848}),
    new StudentGroup({id:group1,name:"aya",course:"Capstone",adminId:student1,membersLimit:10,isPublic:false,gpa:29}),
    new GroupMembers({studentId: student1,groupId: group1}),
    new JoinRequest({id:13,groupId:group1,studentId:student1,status:"pending"})
  ])
});

Given("I already have sent a join request to the group", async function () { });

Then("I go to the {string} page", async function (page: string) {
  await go_to_page(driver, getBottomBarIcon(page));
});


Then("The {string} button is displayed to indicate that a request is already pending", async function (buttonLabel: string) {
  await waitForElementByValue(driver, buttonLabel);
});





// When("I attempt to send another join request", async function () {
//   const joinRequestButton = byValueKey("send_join_request_btn");

//     try {
//     await driver.elementClick(joinRequestButton);
//     assert.fail("The Join group button is clickable, but it should be disabled!");
//     } catch (e) {
//     console.log("The Join group button is correctly unclickable.");
//     }
//     });

//     const joinRequestButton = byValueKey("send_join_request_btn");

//     const buttonText = await driver.getElementText(joinRequestButton);
//     assert.strictEqual(
//         buttonText,
//         "Pending...",
//         Expected button text to be "Pending...", but got "${buttonText}".
//     );
//     console.log(The ${buttonLabel} button is correctly disabled and displays "Pending...".);
// });

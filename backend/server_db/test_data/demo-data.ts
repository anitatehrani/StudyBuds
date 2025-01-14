import { initDB, initData } from "../../../test/utils/mock-data";
import { GroupMembers } from "../../src/models/GroupMembers";
import { JoinRequest } from "../../src/models/JoinRequest";
import { Notification } from "../../src/models/Notification";
import { Student } from "../../src/models/Student";
import { StudentGroup } from "../../src/models/StudentGroup";

async function main() {
  initData();
  const student = 10;
  const student1 = 12;
  const group1 = 103;
  const joinRequestId = 11;
  const student2 = 42674;
  const student3 = 42675;
  const group2 = 104;
  const group3 = 105;
  const group4 = 36;
  await initDB([
    new Student({ studentId: student, telegramAccount: 35 }),
    new StudentGroup({
      id: group1,
      name: "joinrequest",
      description: "description",
      course: "Capstone",
      adminId: student,
      membersLimit: 100,
      isPublic: false,
      gpa: 18,
      telegramLink: "https://t.me/joinrequest",
    }),
    new GroupMembers({ studentId: student, groupId: group1 }),
    new Student({ studentId: student1, telegramAccount: 37 }),
    new JoinRequest({
      id: joinRequestId,
      groupId: group1,
      studentId: student1,
      status: "pending",
    }),
    new Notification({
      id: 1,
      studentId: student,
      joinRequestId: joinRequestId,
      notificationType: "join_request",
      message: "Nona has requested to join the Capstone project",
    }),
    new Student({ studentId: student2, telegramAccount: 1435 }),
    new Student({ studentId: student3, telegramAccount: 1436 }),
    new StudentGroup({
      id: group2,
      name: "mygroupyes",
      description: "description",
      course: "Capstone",
      adminId: student2,
      membersLimit: 10,
      isPublic: false,
      gpa: 20,
      telegramLink: "https://t.me/joinrequest",
    }),
    new GroupMembers({ studentId: student2, groupId: group2 }),
    new GroupMembers({ studentId: student, groupId: group2 }),
    new StudentGroup({
      id: group3,
      name: "groupof10",
      description: "description",
      course: "Capstone",
      adminId: student,
      membersLimit: 100,
      isPublic: false,
      gpa: 18,
      telegramLink: "https://t.me/joinrequest",
    }),
    new GroupMembers({ studentId: student2, groupId: group3 }),
    new GroupMembers({ studentId: student, groupId: group3 }),
    new StudentGroup({
      id: group4,
      name: "adm",
      description: "test description",
      course: "Capstone",
      adminId: student1,
      membersLimit: 10,
      isPublic: false,
      gpa: 18,
      telegramLink: "https://t.me/joinrequest",
    }),
    new GroupMembers({ studentId: student1, groupId: group4 }),
  ]);

}

main().catch(console.error);

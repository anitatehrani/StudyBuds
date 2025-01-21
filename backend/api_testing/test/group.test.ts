import { expect, test } from "vitest";
import { initData, initDB } from "../../../test/utils/mock-data";
import axios from "axios";
import { BACKEND_URL, getToken } from "./utils";
import { Student } from "../../src/models/Student";
import { StudentGroup } from "../../src/models/StudentGroup";

test("empty group creation prevented", async () => {
    initData();
    const student = new Student({ studentId: 4943369, telegramAccount: 1 });
    await initDB([student]);
    const actual = axios.post(
        `${BACKEND_URL}/groups/create`,
        {
            name: "",
            description: "",
            course: "",
            membersLimit: 10,
            telegramLink: "",
            studentId: student.studentId,
            isPublic: true,
        },
        { headers: { Authorization: `Bearer ${getToken(student.studentId)}` } }
    );
    await expect(actual).rejects.toThrowError("Request failed with status code 422");
});

test("group creation", async () => {
    initData();
    const student = new Student({ studentId: 4943369, telegramAccount: 2 });
    await initDB([student]);
    let actual;
    try {
        actual = await axios.post(
            `${BACKEND_URL}/groups/create`,
            {
                name: "CP",
                description: "Capstone Project",
                course: "Capstone",
                membersLimit: 10,
                telegramId: -4751093964,
                isPublic: true,
            },
            { headers: { Authorization: `Bearer ${getToken(student.studentId)}` } }
        );
    } catch (error) {
        console.error("HTTP Error:", error.response ? error.response.data : error.message);
        throw error;
    }

    expect(actual.data).toEqual({
        group: {
            adminId: 4943369,
            course: "Capstone",
            createdAt: expect.any(String),
            description: "Capstone Project",
            gpa: "30.00",
            id: 1,
            isPublic: true,
            membersLimit: 10,
            name: "CP",
            telegramId: "-4751093964",
            telegramLink: expect.any(String),
            updatedAt: expect.any(String),
        },
        message: "Group created successfully",
    });
});

test("group creation with existing telegram link", async () => {
    initData();
    const student = new Student({ studentId: 4943369, telegramAccount: 3 });
    const group = new StudentGroup({
        name: "A",
        description: "b",
        course: "Capstone",
        membersLimit: 10,
        telegramLink: "",
        telegramId: -4751093964,
        adminId: student.studentId,
        isPublic: true,
        gpa: 25,
    });
    await initDB([student, group]);
    let actual;
    try {
        actual = axios.post(
            `${BACKEND_URL}/groups/create`,
            {
                name: "CP",
                description: "Capstone Project",
                course: "Capstone",
                membersLimit: 10,
                telegramId: -4751093964,
                isPublic: true,
            },
            { headers: { Authorization: `Bearer ${getToken(student.studentId)}` } }
        );
    } catch (error) {
        console.error("HTTP Error:", error.response ? error.response.data : error.message);
        throw error;
    }
    await expect(actual).rejects.toThrowError("Request failed with status code 400");
});

test("group creation with student without telegramId", async () => {
    initData();
    const student = new Student({ studentId: 4943369 });
    await initDB([student]);
    const actual = await axios.post(
        `${BACKEND_URL}/groups/create`,
        {
            name: "CP",
            description: "Capstone Project",
            course: "Capstone",
            membersLimit: 10,
            telegramLink: "",
            telegramId: -4751093964,
            isPublic: true,
        },
        { headers: { Authorization: `Bearer ${getToken(student.studentId)}` } }
    );

    //console.error("HTTP Error:", actual);
    expect(actual).rejects.toThrowError("Request failed with status code 400");
});

test("basic search test", async () => {
    initData();
    const student = new Student({ studentId: 4943369, telegramAccount: 4 });
    const group = new StudentGroup({
        name: "CP",
        description: "Capstone Project",
        course: "Capstone",
        membersLimit: 10,
        telegramLink: "",
        telegramId: -4751093964,
        adminId: student.studentId,
        isPublic: true,
        gpa: 25,
    });
    await initDB([student, group]);

    const actual = await axios.get(`${BACKEND_URL}/groups/basic_search/CP`, {
        headers: { Authorization: `Bearer ${getToken(student.studentId)}` },
    });
    expect(actual.data).toEqual([
        {
            id: 3,
            name: "CP",
            description: "Capstone Project",
            isPublic: true,
            course: "Capstone",
            membersCount: 0,
            requestStatus: null,
            isGroupAdmin: true,
            isGroupMember: false,
        },
    ]);
});

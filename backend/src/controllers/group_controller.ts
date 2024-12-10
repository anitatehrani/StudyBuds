import { Request, Response } from "express";
import Group from "../models/Group";
import Student from "../models/Student";
import GroupService from "../service/group_service";
import { BadRequestError, NotFoundError } from "../utils/api_error";
import {
    checkBoolean,
    checkInt,
    checkString,
    IndexSignature,
    validateInt,
    validateString,
} from "../utils/validation_error";

// Function to create a group
export async function createGroup(req: Request) {
    const body = req.body as IndexSignature;
    const name = checkString(body, "name");
    const description = checkString(body, "description");
    const course = checkString(body, "course");
    const membersLimit = checkInt(body, "membersLimit");
    const telegramLink = checkString(body, "telegramLink");
    const studentId = checkInt(body, "studentId");
    const isPublic = checkBoolean(body, "isPublic");

    // Validate if the student exists
    const student = await Student.findByPk(studentId);
    if (!student) {
        throw new NotFoundError("Student not found");
    }

    // Check if the telegramLink already exists
    const existingGroup = await Group.findOne({ where: { telegramLink } });
    if (existingGroup) {
        throw new BadRequestError("This Telegram link already exists");
    }

    // Create the group using GroupService
    const group = await GroupService.createGroup({
        name,
        description,
        course,
        isPublic,
        membersLimit,
        telegramLink,
        adminId: studentId, // Maps studentId to adminId
    });

    return { message: "Group created successfully", group };
}

// Function to get all groups
export async function getAllGroups(req: Request) {
    return await Group.findAll();
}

export async function basicSearchResult(req: Request) {
    const text = validateString(req.params, "text");
    const student_id = validateInt(req.params, "student_id");
    const result = await GroupService.basicSearch(text, student_id);
    console.log(result);
    return result;
}

export default {
    createGroup,
    getAllGroups,
};

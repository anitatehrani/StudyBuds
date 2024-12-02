import { Request, Response } from "express";
import Group from "../models/Group";
import Student from "../models/Student";
import GroupService from "../service/group_service";
import {
  BadRequestError,
  NotFoundError,
  ValidationError,
} from "../utils/api_error";
import { IndexSignature, validateInt, validateString } from "../utils/validation_error";

// Function to create a group
export async function createGroup(req: Request, res: Response): Promise<void> {
  // const {
  //   name,
  //   description,
  //   course,
  //   isPublic,
  //   membersLimit,
  //   telegramLink,
  //   studentId,
  // } = req.body;
  const body=req.body as IndexSignature
  const name=validateString(body,"name");
  const description=validateString(body,"description");
  const course=validateString(body,"course");
  const membersLimit=validateInt(body,"membersLimit");
  const telegramLink=validateString(body,"telegramLink");
  const studentId=validateInt(body,"studentId");
  const isPublic=validateString(body,"isPublic");

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

  res.status(201).json({ message: "Group created successfully", group });
}

// Function to get all groups
export async function getAllGroups(req: Request, res: Response): Promise<void> {
  const groups = await Group.findAll();
  res.json(groups);
}

export async function basicSearchResult(req: Request, res: Response) {
  const text = req.params["text"];
  const student_id_raw = req.params["student_id"];
  if (text === undefined) throw new ValidationError("Missing text field");
  if (student_id_raw === undefined)
    throw new ValidationError("Student id is null");
  const student_id = Number.parseInt(student_id_raw);
  if (isNaN(student_id)) throw new ValidationError("Student id is malformed");
  const result = await GroupService.basicSearch(text, student_id);
  res.send(result);
}

export default {
  createGroup,
  getAllGroups,
};

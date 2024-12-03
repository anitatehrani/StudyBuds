import { Request, Response } from "express";
import { getProfileService } from "../service/profile_service";
import { ValidationError } from "../utils/api_error";
import { validateInt } from "../utils/validation_error";

export async function getProfileById(req: Request, res: Response) {
  const studentId = validateInt(req.params, "id");

  const result = await getProfileService(studentId);
  // Remove the 'courses' field
  const { courses, ...dataWithoutCourses } = result;
  res.json(dataWithoutCourses);
};

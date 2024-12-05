import { Request } from "express";
import { getProfileService } from "../service/profile_service";
import { validateInt } from "../utils/validation_error";

export async function getProfileById(req: Request) {
  const studentId = validateInt(req.params, "id");

  const result = await getProfileService(studentId);
  // Remove the 'courses' field
  const { courses, ...dataWithoutCourses } = result;
  return dataWithoutCourses
};

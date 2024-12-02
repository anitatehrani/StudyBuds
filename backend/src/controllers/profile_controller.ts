import { Request, Response } from "express";
import { getProfileService } from "../service/profile_service";
import { ValidationError } from "../utils/api_error";

export async function getProfileById(req:Request, res:Response){
    const rawStudentId=req.params["id"];
  console.log(req.params["id"]);
  if(rawStudentId===undefined){
      throw new ValidationError("Student ID is missing");
  }
  const studentId=Number.parseInt(rawStudentId);
  if(isNaN(studentId))throw new ValidationError("Invalid student ID");

  const result = await getProfileService(studentId);
  // Remove the 'courses' field
  const { courses, ...dataWithoutCourses } = result;
  res.json(dataWithoutCourses);
};

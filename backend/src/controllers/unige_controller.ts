import { Request } from "express";
import { getCourses } from "../service/unige_service";

export async function getCourseList(req: Request) {
  return await getCourses();
}

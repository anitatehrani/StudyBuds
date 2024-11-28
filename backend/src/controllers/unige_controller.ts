import { Request, Response } from "express";
import { getCourses } from "../service/unige_service";

export const getCourseList = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const courses = await getCourses();

  res.json({
    courses,
  });
};

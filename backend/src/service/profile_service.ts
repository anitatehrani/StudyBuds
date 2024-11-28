import { getStudentById } from "../service/student_service";
import { getUnigeProfile } from "./unige_service";

export async function getProfileService(studentId: number) {
  const data = await getUnigeProfile(studentId);

  // Remove the 'courses' field
  const { courses, ...dataWithoutCourses } = data;

  console.log(studentId);

  const student = await getStudentById(studentId);

  dataWithoutCourses["telegram_account"] = student?.telegramAccount;

  return dataWithoutCourses;
}

import { axios_instance, TOKEN, UNIGEAPI_URL } from "../config/unigeapi";

export async function getCourses(): Promise<Array<string>> {
  return (
    await axios_instance.get(`${UNIGEAPI_URL}/courses`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
  ).data;
}

export interface UnigeStudent {
  first_name: string;
  last_name: string;
  email: string;
  id: number;
  password: string;
  courses: Array<string>;
}

export async function getUnigeProfile(
  studentId: number,
): Promise<UnigeStudent> {
  return (
    await axios_instance.get(`${UNIGEAPI_URL}/student/${studentId}`, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    })
  ).data;
}

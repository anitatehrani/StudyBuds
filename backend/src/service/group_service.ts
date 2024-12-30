import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import Group from "../models/Group";
import getSuggestedGroupsbyCourses, { getSuggestedGroupsbyFriends, getSuggestedGroupsbyPopularity } from "./suggestion_service";

interface GroupData {
  name: string;
  description?: string;
  course: string;
  isPublic: boolean;
  membersLimit: number;
  telegramLink?: string;
  adminId: number; // Maps studentId to adminId
}

export async function getGroupById(groupId: number) {
  const data = await Group.findOne({
    where: {
      id: groupId,
    },
  });
  return data;
}

export async function createGroup(groupData: GroupData): Promise<Group> {
  const {
    name,
    description,
    course,
    isPublic,
    membersLimit,
    telegramLink,
    adminId,
  } = groupData;

  const group = new Group({
    name,
    description,
    course,
    isPublic,
    membersLimit,
    telegramLink,
    adminId,
  });

  await group.save();
  return group;
}

interface SearchResult {
  id: number;
  name: string;
  description: string | null;
  isPublic: boolean;
  course: string;
  memberCount: number;
  status: string | null;
}

export interface PopularityResult {
  group_id: string;
  members: number
}

export async function basicSearch(
  text: string,
  studentId: number
): Promise<SearchResult[]> {
  const searchText = `%${text}%`;
  const query = `
    SELECT
      sg.id,
      sg.name,
      sg.description,
      sg.is_public AS "isPublic",
      sg.course,
      COUNT(gm.student_id) AS "memberCount",
      jr.status
    FROM
      studybuds.student_group sg
    LEFT JOIN
      studybuds.group_members gm ON sg.id = gm.group_id
    LEFT JOIN
      studybuds.join_request jr ON sg.id = jr.group_id AND jr.student_id = :studentId
    WHERE
      sg.name ILIKE :searchText
      OR sg.description ILIKE :searchText
      OR sg.course ILIKE :searchText
    GROUP BY
      sg.id,
      sg.name,
      sg.description,
      sg.is_public,
      sg.course,
      jr.status
    ORDER BY
      "memberCount" DESC;
  `;
  try {
    const results = await sequelize.query<SearchResult>(query, {
      replacements: { searchText, studentId },
      type: QueryTypes.SELECT,
    });
    return results;
  } catch (error) {
    console.error(`Failed to execute basic search. Error: ${error.message}`);
    throw error;
  }
}


export async function getSuggestedGroups(
  studentId: number
): Promise<SearchResult[]> {

  const courses = await getSuggestedGroupsbyCourses(studentId);
  //console.log(courses);
  const popularity = await getSuggestedGroupsbyPopularity();
  // console.log(popularity);

  const friends = await getSuggestedGroupsbyFriends(studentId);
  console.log(friends);

  return null;
};




export default {
  createGroup,
  basicSearch,
  getSuggestedGroups,
};

import { QueryTypes } from "sequelize";
import sequelize from "../config/database";
import Group from "../models/Group";
import { getSuggestedGroupsbyCourses, getSuggestedGroupsbyFriends, getSuggestedGroupsByGpa, getSuggestedGroupsbyPopularity } from "./suggestion_service";
import { getJoinRequestByGroupId } from "./join_request_service";
import { getCurrentMemberCount } from "./group_member";

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

  const student_info = await UnigeService.getUnigeProfile(adminId);
  const gpa_s = student_info.gpa;

  const group = new Group({
    name,
    description,
    course,
    isPublic,
    gpa_s,
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

  //courses > friends > gpa > popularity
  const POPULARITY_WEIGHT = 0.2;
  const FRIENDS_WEIGHT = 0.4;
  const GPA_WEIGHT = 0.4;

  const score: Map<number, number> = new Map();

  const assignPoints = (group_list: Group[], weight: number) => {
    for (let i = 0; i < group_list.length; ++i) {
      let group_id = group_list[i]['id'];
      if (!score.has(group_id)) continue;
      let points = score.get(group_id) + weight * (group_list.length - i);
      score.set(group_id, points);
    }
  }


  const courses = await getSuggestedGroupsbyCourses(studentId);
  const popularity = await getSuggestedGroupsbyPopularity();
  const friends = await getSuggestedGroupsbyFriends(studentId);
  const gpa = await getSuggestedGroupsByGpa();

  // populate the score mapping
  courses.forEach((group) => {
    score.set(group['id'], 0)
  })

  // assign points to groups based on popularity
  assignPoints(popularity, POPULARITY_WEIGHT);

  // assign points to groups based on friends
  assignPoints(friends, FRIENDS_WEIGHT);

  // assign points to groups based on gpa
  assignPoints(gpa, GPA_WEIGHT);

  // order group ids
  const ordered_scores = Array.from(score.entries());
  ordered_scores.sort((a, b) => b[1] - a[1]);

  const res: SearchResult[] = null;

  // create result
  ordered_scores.forEach(async (elem) => {
    let group_id = elem[0];
    // get group
    

    let memberCount = await getCurrentMemberCount(group_id);
    let status = await getJoinRequestByGroupId(studentId, group_id);
    res.push({
      id: group_id,
      name: 
    })

  })




  return null;
};




export default {
  createGroup,
  basicSearch,
  getSuggestedGroups,
};

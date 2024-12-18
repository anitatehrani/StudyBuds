import assert from "assert";
import { Op } from "sequelize";
import Group from "../models/Group";
import GroupMembers from "../models/GroupMembers";

Group.hasMany(GroupMembers, { foreignKey: "group_id" });
GroupMembers.hasOne(Group, { foreignKey: "id" });

interface JoinedGroupList {
  ownedGroups: Partial<Group>[];
  joinedGroups: Partial<Group>[];
}

import { literal } from "sequelize";

async function getAllJoinedGroupList(
  studentId: number
): Promise<(Partial<Group> & { membersCount: number })[]> {
  const result = await Group.findAll({
    attributes: [
      "id",
      "name",
      "description",
      "course",
      "isPublic",
      "adminId",
      [
        literal(`(
          SELECT COUNT(*)
          FROM studybuds.group_members AS gm
          WHERE gm.group_id = "Group".id
        )`),
        "memberCount",
      ],
    ],
    include: {
      model: GroupMembers,
      required: true,
      attributes: [],
      where: { studentId: { [Op.eq]: studentId } },
    },
  });

  return result.map((group: any) => ({
    ...group.toJSON(),
    membersCount: group.getDataValue("memberCount"),
  }));
}

function splitJoinedGroupList(
  input: (Partial<Group> & { membersCount?: number })[],
  studentId: number
): JoinedGroupList {
  const ownedGroups = input
    .filter((x) => x.adminId === studentId)
    .map((x) => {
      assert(x.adminId !== undefined, "Expected adminId to be defined.");
      const group = { ...x };
      delete group.adminId;
      console.log(group);
      return group;
    });
  const joinedGroups = input
    .filter((x) => x.adminId !== studentId)
    .map((x) => {
      const group = { ...x };
      delete group.adminId;
      return group;
    });
  return {
    ownedGroups,
    joinedGroups,
  };
}

export async function getJoinedGroupList(
  studentId: number
): Promise<JoinedGroupList> {
  return splitJoinedGroupList(
    await getAllJoinedGroupList(studentId),
    studentId
  );
}

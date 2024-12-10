import { Op } from "sequelize";
import Group from "../models/Group";
import GroupMembers from "../models/GroupMembers";
import assert from "assert";

Group.hasMany(GroupMembers, { foreignKey: "group_id" });
GroupMembers.hasOne(Group, { foreignKey: "id" });

interface JoinedGroupList {
  ownedGroups: Partial<Group>[];
  joinedGroups: Partial<Group>[];
}

async function getAllJoinedGroupList(
  studentId: number,
): Promise<Partial<Group>[]> {
  const result = await Group.findAll({
    attributes: ["id", "name", "description", "course", "isPublic", "adminId"],
    include: {
      model: GroupMembers,
      required: true,
      attributes: [],
      where: { studentId: { [Op.eq]: studentId } },
    },
  });
  return result;
}

function splitJoinedGroupList(
  input: Partial<Group>[],
  studentId: number,
): JoinedGroupList {
  const ownedGroups = input
    .filter((x) => x.adminId === studentId)
    .map((x) => {
      assert(x.toJSON !== undefined);
      x=x.toJSON();
      delete x.adminId;
      return x;
    });
  const joinedGroups = input
    .filter((x) => x.adminId !== studentId)
    .map((x) => {
      assert(x.toJSON !== undefined);
      x=x.toJSON();
      delete x.adminId;
      return x;
    });
  return {
    ownedGroups,
    joinedGroups,
  };
}

export async function getJoinedGroupList(
  studentId: number,
): Promise<JoinedGroupList> {
  return splitJoinedGroupList(
    await getAllJoinedGroupList(studentId),
    studentId,
  );
}

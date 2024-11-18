import GroupMembers from "../models/GroupMembers";

export async function getCurrentMemberList(groupId) {
    const cnt = await GroupMembers.count({
        where: {
            groupId: groupId
        }
    });
    return cnt;
}


export async function joinGroup(studentId, groupId) {
    const joinGroup = await GroupMembers.create({
        studentId: studentId,
        groupId: groupId
    });
    return joinGroup;
}
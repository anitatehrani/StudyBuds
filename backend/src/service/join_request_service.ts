import JoinRequest from "../models/JoinRequest";

export async function createJoinRequest(studentId, groupId) {
    const joinGroup = await JoinRequest.create({
        studentId: studentId,
        groupId: groupId,
        status: "Pending"
    });
    return joinGroup;
}
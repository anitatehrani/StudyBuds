import Group from "../models/Group";
import GroupMembers from "../models/GroupMembers";
import UnigeService from "./unige_service";

export async function getCurrentMemberList(groupId:number) {
    const cnt = await GroupMembers.count({
        where: {
            groupId: groupId
        }
    });
    return cnt;
}



export async function joinGroup(studentId:number, groupId:number) {

    const num_old = await getCurrentMemberList(groupId);

    const student_info = await UnigeService.getUnigeProfile(studentId);
    const gpa_s = student_info.gpa;

    const group = await Group.findOne({
        where: {
            id: groupId
        }
    });

    const gpa_g = group.gpa;

    const gpa_new = (gpa_g * num_old + gpa_s) / (num_old + 1);

    await Group.update({
        gpa: gpa_new
    }, {
        where: {
            id: groupId
        }
    });


    const joinGroup = await GroupMembers.create({
        studentId: studentId,
        groupId: groupId
    });

    return joinGroup;
}

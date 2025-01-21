import { GroupMembers } from "../models/GroupMembers";
import { Student } from "../models/Student";
import { StudentGroup } from "../models/StudentGroup";
import { calculateAverageGpa } from "./unige_service";

export async function getCurrentMemberCount(groupId: number) {
    const cnt = await GroupMembers.count({
        where: {
            groupId: groupId
        }
    });
    return cnt;
}

export async function getCurrentMemberList(groupId: number) {
    const cnt = await GroupMembers.findAll({
        where: {
            groupId: groupId
        }
    });
    return cnt.map(member => member.studentId);
}

export async function removeUserFromGroup(studentTelegramId: number, groupTelegramId: number) {
    console.log("Removing user with telegram id", studentTelegramId, "from group with telegram id", groupTelegramId);
    
    //find student with the specific telegram id
    const student = await Student.findOne({
        where: {
            telegramAccount: studentTelegramId
        }
    });

    //find group with the specific telegram id
    const group = await StudentGroup.findOne({
        where: {
            telegramId: groupTelegramId
        }
    });

    if (!student || !group) {
        console.log("Student or group not found");
        return { success: false };
    }

    const studentId = student.studentId;
    const groupId = group.id;


    const student_ids = await getCurrentMemberList(groupId);
    const index = student_ids.indexOf(studentId);
    if (index > -1) {
        student_ids.splice(index, 1);
    }
    const gpa = await calculateAverageGpa(student_ids);
    await StudentGroup.update({
        gpa: gpa.average_gpa
    }, {
        where: {
            id: groupId
        }
    });    

    await GroupMembers.destroy({
        where: {
            studentId: studentId,
            groupId: groupId
        }
    });

    console.log("Removed user", studentId, "from group", groupId);

    return {success : true};
}


export async function joinGroup(studentId: number, groupId: number) {
    // old version
    // const num_old = await getCurrentMemberCount(groupId);

    // const student_info = await UnigeService.getUnigeProfile(studentId);
    // const gpa_s = student_info.gpa;

    // const group = await Group.findOne({
    //     where: {
    //         id: groupId
    //     }
    // });

    // const gpa_g = group.gpa;

    // // const gpa_new = (gpa_g * num_old + gpa_s) / (num_old + 1);

    const student_ids = await getCurrentMemberList(groupId);
    student_ids.push(studentId);
    const gpa_new = await calculateAverageGpa(student_ids);
    const gpa = gpa_new.average_gpa;
    await StudentGroup.update({
        gpa: gpa
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

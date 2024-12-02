import { Request, Response } from 'express';
import { getStudentFirebaseToken } from '../service/firebase_token_service';
import { getCurrentMemberList, joinGroup } from '../service/group_member';
import { getGroupById } from '../service/group_service';
import { createJoinRequest, getJoinRequestById, updateJoinRequestStatus } from '../service/join_request_service';
import { sendPushNotification } from '../service/notification_service';
import { getStudentById } from '../service/student_service';
import { NotFoundError } from '../utils/notfound_error';
import { ValidationError } from '../utils/validation_error';
import { NotificationType } from '../models/Notification';

export async function joinTheGroup(req:Request, res:Response){
    const { studentId, groupId } = req.body;
    console.log(`studentId:${studentId}`);
    if (!studentId || !groupId) {
        throw new ValidationError('studentId and groupId are required.');
    }

    const student = await getStudentById(studentId);
    if (!student) {
        console.log('Student not found');
        throw new NotFoundError('Student not found');
    }
    if (!student.telegramAccount) {
        console.log('Student has not linked their Telegram account');
        throw new ValidationError('Student has not linked their Telegram account');
    }

    const group = await getGroupById(groupId);
    if (!group) {
        console.log('Could not find group information');
        throw new NotFoundError('Group not found');
    }

    const memberCount = await getCurrentMemberList(groupId);
    const membersLimit = group.membersLimit;
    if (memberCount >= membersLimit) {
        throw new ValidationError('The group has reached its member limit.');
    }

    const isPublic = group.isPublic;
    if (isPublic) {
        await joinGroup(studentId, groupId);
        res.send('Student added to the group successfully');
    } else {
        const joinRequest = await createJoinRequest(studentId, groupId);
        const joinRequestId = joinRequest.id;

        const adminId = group.adminId;

        const fbToken = await getStudentFirebaseToken(adminId);
        if (!fbToken) {
            console.log('Firebase token not found for the student');
            throw new ValidationError('Student has not registered a device for notifications.');
        }

        const token = fbToken.token;
        await sendPushNotification(adminId, joinRequestId, token, NotificationType.JOIN_REQUEST);

        res.send('Join request submitted successfully');
    }
};

export async function changeJoinRequestStatus(req:Request, res:Response){
    const { adminId, joinRequestId, isAccepted }  = req.body;
    console.log(joinRequestId)
    const joinRequest = await getJoinRequestById(joinRequestId)
    console.log(`---- ${joinRequest}`)
    if (!joinRequest) {
        console.log('JoinRequest not found')
        throw new NotFoundError('JoinRequest not found')
    }
    const groupId = joinRequest.groupId
    // const studentId = joinRequest.get('studentId') as number
    console.log(`groupId: ${groupId}`)
    const group = await getGroupById(groupId)
    if (!group) {
        console.log('Group not found')
        throw new NotFoundError('Group not found');
    }
    const groupAdminId = group?.adminId
    if (groupAdminId !== adminId)
        throw new ValidationError("You don't have permission");
    if (!isAccepted) {
        await updateJoinRequestStatus(joinRequestId, 'Rejected')
        // todo send notification
        res.send('Join request rejected successfully');
    }
    // TODO
    // const currentLimit = group.currentMembersCnt
    // const membersLimit = group.membersLimit
    // if (membersLimit < currentLimit + 1) {
    //     console.log('The group is already reached the limit of members')
    //     throw new ValidationError('The group is already reached the limit of members');
    // }
    await updateJoinRequestStatus(joinRequestId, 'Accepted')
    // todo send notification
    res.send('Join request accepted successfully');
}

import { Request } from 'express';
import { getStudentId } from '../middlewares/auth_middleware';
import { Notification } from '../models/Notification';
import { getStudentFirebaseToken, saveFbToken, updateFbToken } from '../service/firebase_token_service';
import { getStudentNotifications, testNotification } from '../service/notification_service';
import { checkInt, checkString } from '../utils/validation_error';



export async function getAllNotification(req: Request) {
    return await Notification.findAll()
};

export async function getStudentsAllNotification(req: Request) {
    const studentId = getStudentId(req);
    const result = await getStudentNotifications(studentId)
    console.log(result)
    return result
};

export async function saveToken(req: Request) {

    const studentId = checkInt(req.body, "studentId");
    const token = checkString(req.body, "token");

    const fbTokenModel = await getStudentFirebaseToken(studentId);

    if (fbTokenModel === null) {
        await saveFbToken(studentId, token);
        return { message: "Successfully saved the student's Firebase token" };
    } else {
        await updateFbToken(studentId, token);
        return { message: "Successfully updated the student's Firebase token" };
    }
};

export async function testNotif(req: Request) {
    const token = checkString(req.body, "token");
    const msg = checkString(req.body, 'msg');

    testNotification(token, msg);

}

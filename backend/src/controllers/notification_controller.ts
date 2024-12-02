import { Request, Response } from 'express';
import Notification from '../models/Notification';
import { getStudentFirebaseToken, saveFbToken, updateFbToken } from '../service/firebase_token_service';
import { getStudentNotifications } from '../service/notification_service';
import { ValidationError } from '../utils/api_error';
import { checkInt, checkString, validateInt } from '../utils/validation_error';



export async function getAllNotification(req: Request, res: Response) {
    const result = await Notification.findAll()
    res.send(
        result
    )
};

export async function getStudentsAllNotification(req: Request, res: Response) {
    const studentId = validateInt(req.params, "studentId");
    const result = await getStudentNotifications(studentId)
    console.log(result)
    res.send(result)
};

export async function saveToken(req: Request, res: Response) {

    const studentId = checkInt(req.body, "studentId");
    const token = checkString(req.body, "token");

    const fbTokenModel = await getStudentFirebaseToken(studentId);

    if (fbTokenModel === null) {
        await saveFbToken(studentId, token);
        res.send({ message: "Successfully saved the student's Firebase token" });
    } else {
        await updateFbToken(studentId, token);
        res.send({ message: "Successfully updated the student's Firebase token" });
    }
};

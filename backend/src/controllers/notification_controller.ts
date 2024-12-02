import { Request, Response } from 'express';
import Notification from '../models/Notification';
import { getStudentFirebaseToken, saveFbToken, updateFbToken } from '../service/firebase_token_service';
import { getStudentNotifications } from '../service/notification_service';
import { ValidationError } from '../utils/api_error';



export async function getAllNotification(req: Request, res: Response) {
    const result = await Notification.findAll()
    res.send(
        result
    )
};

export async function getStudentsAllNotification(req: Request, res: Response) {
    const studentIdRaw=req.params['studentId']
    if(studentIdRaw===undefined)throw new ValidationError("Missing Student ID")
    const studentId=Number.parseInt(studentIdRaw);
    if(isNaN())
    const result = await getStudentNotifications(Number.parseInt(studentId))
    console.log(result)
    res.send(result)
};

export async function saveToken(req: Request, res: Response){
    try {
        const { studentId, token } = req.body;

        const fbTokenModel = await getStudentFirebaseToken(studentId);

        if (!fbTokenModel) {
            await saveFbToken(studentId, token);
            res.status(200).send({ message: "Successfully saved the student's Firebase token" });
        } else {
            await updateFbToken(studentId, token);
            res.status(200).send({ message: "Successfully updated the student's Firebase token" });
        }
    } catch (err) {
        console.error('Error in saveToken:', err);
        res.status(err.status || 500).send(err.message || 'Internal server error');
    }
};

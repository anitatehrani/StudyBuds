import { Request, Response } from 'express';
import Notification from '../models/Notification';
import { getStudentFirebaseToken, saveFbToken, updateFbToken } from '../service/firebase_token_service';
import { getStudentNotifications } from '../service/notification_service';



export const getAllNotification = async (req: Request, res: Response) => {
    try {
        const result = await Notification.findAll()
        res.status(200).send(
            result
        )
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};

export const getStudentsAllNotification = async (req: Request, res: Response) => {

    const result = await getStudentNotifications(Number.parseInt(req.params['studentId']))
    console.log(result)
    res.send(result)
};

export const saveToken = async (req: Request, res: Response) => {
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

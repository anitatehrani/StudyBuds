import Notification from '../models/Notification';
import { getStudentFirebaseToken, saveFbToken, updateFbToken } from '../service/firebase_token_service';
import { getStudentNotifcations } from '../service/notification_service';


export const getAllNotification = async (req,res)=>{
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

export const getStudentsAllNotification = async (req,res)=>{
    try {
        const result = await getStudentNotifcations(req.params.studentId)
        console.log(result)
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};

export const saveToken = async (req, res) => {
    try {
        const { studentId, token } = req.body;

        const fbTokenModel = await getStudentFirebaseToken(studentId);

        if (!fbTokenModel) {
            await saveFbToken(studentId, token);
            return res.status(200).send({ message: "Successfully saved the student's Firebase token" });
        } else {
            await updateFbToken(studentId, token);
            return res.status(200).send({ message: "Successfully updated the student's Firebase token" });
        }
    } catch (err) {
        console.error('Error in saveToken:', err);
        return res.status(err.status || 500).send(err.message || 'Internal server error');
    }
};

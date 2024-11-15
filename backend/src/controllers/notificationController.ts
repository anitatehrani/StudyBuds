import Notification from '../models/Notification';
import { saveFbToken } from '../service/firebase_token_service';
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

export const saveStudentToken = async (req, res) =>{
    try {
        const { studentId, token } = req.body;
        const result = await saveFbToken(studentId, token);
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
}

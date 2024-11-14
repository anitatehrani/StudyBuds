import Notification from '../models/Notification';
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
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(err.status || 500);
        res.send(err.message || 'Internal server error');
    }
};

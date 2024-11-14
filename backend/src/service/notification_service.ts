import Notification from '../models/Notification';

export async function getStudentNotifcations(studentId: number) {
    const data = await Notification.findAll({
        where: {
            studentId: studentId
        }
    });
    return data;
}
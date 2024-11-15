import Notification from '../models/Notification';

export async function getStudentNotifcations(studentId: number) {
    const data = await Notification.findAll({
        where: {
            studentId: studentId
        }
    });
    return data;
}

export async function saveNotification(studentId, joinRequestId, notificationType) {
        const result = await Notification.create({
            studentId: studentId,
            joinRequestId: joinRequestId,
            notificationType: notificationType
        })
        return result;
}
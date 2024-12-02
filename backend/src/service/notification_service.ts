import admin from 'firebase-admin';
import Notification, { NotificationType } from '../models/Notification';
import { getErrorMessage } from '../utils/api_error';
import assert from 'assert';


export async function getStudentNotifications(studentId: number) {
    const data = await Notification.findAll({
        where: {
            studentId: studentId
        }
    });
    return data;
}

export async function saveNotification(studentId:number, joinRequestId:number, notificationType:string) {
    const result = await Notification.create({
        studentId: studentId,
        joinRequestId: joinRequestId,
        notificationType: notificationType
    })
    return result;
}

const getNotificationTemplate = (notificationType: NotificationType) => {
    switch (notificationType) {
        case NotificationType.JOIN_REQUEST:
            return {
                title: 'New Join Request',
                body: 'A student wants to join your group.',
            };

        case NotificationType.ACCEPT:
            return {
                title: 'Join Request Accepted',
                body: 'Your request to join the group has been accepted!',
            };

        case NotificationType.REJECT:
            return {
                title: 'Join Request Rejected',
                body: 'Your request to join the group has been rejected.',
            };

        default:
            assert(false,"Unknown notification type");
    }
};

export async function sendPushNotification(studentId: number, joinRequestId: number, token: string, notificationType: NotificationType) {
    try {
        const template = getNotificationTemplate(notificationType);
        if (!template) {
            throw new Error(`Invalid notification type: ${notificationType}`);
        }

        const message = {
            notification: template,
            token,
        };

        const response = await admin.messaging().send(message);
        console.log('Notification sent successfully:', response);

        await saveNotification(studentId, joinRequestId, notificationType);
    } catch (error) {
        console.error('Failed to send push notification:', getErrorMessage(error));
        throw error;
    }
};


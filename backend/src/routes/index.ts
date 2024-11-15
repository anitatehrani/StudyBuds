import { Router } from 'express';
export const router = Router();
export default router;

import { getStudentsAllNotification, saveStudentToken } from '../controllers/notificationController';
import { getAllStudents, getStudent } from '../controllers/studentController';
router.get('/',getAllStudents);
router.get('/:id', getStudent);
router.get('/notifcation/:studentId', getStudentsAllNotification);
router.post('/notifcation', saveStudentToken);
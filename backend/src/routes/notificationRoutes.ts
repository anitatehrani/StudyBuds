import { Router } from 'express';
import { getStudentsAllNotification, saveStudentToken } from '../controllers/notificationController';


const router: Router = Router();

// Route to save firebase token
router.post('/notification', saveStudentToken);

// Route to fetch a student's all notification
router.get('/notification', getStudentsAllNotification);

export default router;

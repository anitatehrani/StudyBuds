import { Router } from 'express';
import { getStudentsAllNotification, saveToken } from '../controllers/notification_controller';


const router: Router = Router();

// Route to save firebase token
router.post('/token', saveToken);

// Route to fetch a student's all notification
router.get('/list/:studentId', getStudentsAllNotification);

export default router;

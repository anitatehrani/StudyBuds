import { Router } from 'express';
import { getStudentsAllNotification, saveToken } from '../controllers/notification_controller';
import { asyncWrapper } from '../utils/wrapper';


const router: Router = Router();

// Route to save firebase token
router.post('/token', asyncWrapper(saveToken));

// Route to fetch a student's all notification
router.get('/list/:studentId', asyncWrapper(getStudentsAllNotification));

export default router;

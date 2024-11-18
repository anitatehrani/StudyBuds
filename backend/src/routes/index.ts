import { Router } from 'express';
export const router = Router();
export default router;

import { joinTheGroup } from '../controllers/joinrequestContoller';
import { getAllStudents, getStudent } from '../controllers/studentController';
import { basicSearchResult } from '../controllers/groupController';
import { getStudentsAllNotification, saveStudentToken } from '../controllers/notificationController';
router.get('/',getAllStudents);
router.get('/:id', getStudent);
router.get('/basic_search/:text/:student_id', basicSearchResult);

router.get('/notifcation/:studentId', getStudentsAllNotification);
router.post('/notifcation', saveStudentToken);
router.post('/group', joinTheGroup)
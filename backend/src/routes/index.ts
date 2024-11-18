import { Router } from 'express';
export const router = Router();
export default router;

import {getAllStudents, getStudent} from '../controllers/studentController';

import { basicSearchResult }  from '../controllers/basicSearchController';
import { joinTheGroup } from '../controllers/joinrequestContoller';
import { getStudentsAllNotification, saveStudentToken } from '../controllers/notificationController';
import { getAllStudents, getStudent } from '../controllers/studentController';
router.get('/',getAllStudents);
router.get('/:id', getStudent);
router.get('/basic_search/:text/:student_id', basicSearchResult);

router.get('/notifcation/:studentId', getStudentsAllNotification);
router.post('/notifcation', saveStudentToken);
router.post('/group', joinTheGroup)
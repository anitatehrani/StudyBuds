import {Router} from 'express';
export const router = Router();
export default router;

import {getAllStudents, getStudent} from '../controllers/studentController';

router.get('/',getAllStudents);
router.get('/:id', getStudent);

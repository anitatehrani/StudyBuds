import {Router} from 'express';
export const router = Router();
export default router;

import {getAllStudents, getStudent} from '../controllers/studentController';

import { basicSearchResult }  from '../controllers/basicSearchController';
router.get('/',getAllStudents);
router.get('/:id', getStudent);
router.get('/basic_search/:text/:student_id', basicSearchResult);

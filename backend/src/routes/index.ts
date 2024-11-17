import { Router } from 'express';
import { getAllStudents, getStudent } from '../controllers/studentController';

const router: Router = Router();

// Route to get all students
router.get('/', getAllStudents);

// Route to get a student by ID
router.get('/:id', getStudent);

export default router;

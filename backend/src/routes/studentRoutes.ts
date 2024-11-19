import { Router } from 'express';
import { getAllStudents, getStudent } from '../controllers/studentController';

const router: Router = Router();

// Route to get all students (specific to /students/all)
router.get('/all', getAllStudents); // Change the path to avoid overlap

// Route to get a student by ID
router.get('/:id', getStudent);

export default router;

import { Router } from 'express';
import { getCourses } from '../controllers/courseController';

const router: Router = Router();

// Route to fetch all courses
router.get('/all', getCourses);

export default router;

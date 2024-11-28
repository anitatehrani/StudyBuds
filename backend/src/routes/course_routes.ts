import { Router } from 'express';
import { getCourseList } from '../controllers/unige_controller';

const router: Router = Router();

// Route to fetch all courses
router.get('/all', getCourseList);

export default router;

import { Router } from 'express';
import { getCourseList } from '../controllers/unige_controller';
import { asyncWrapper } from '../utils/wrapper';
const router: Router = Router();

// Route to fetch all courses
router.get('/all', asyncWrapper(getCourseList));

export default router;

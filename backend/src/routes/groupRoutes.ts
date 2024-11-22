import { Router } from 'express';
import { createGroup, getAllGroups, basicSearchResult } from '../controllers/groupController';


const router: Router = Router();

// Route to create a group
router.post('/create', createGroup);

// Route to fetch all groups
router.get('/all', getAllGroups);

router.get('/basic_search/:text/:student_id', basicSearchResult);

export default router;

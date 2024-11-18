import { Router } from 'express';
import { createGroup, getAllGroups } from '../controllers/groupController';

const router: Router = Router();

// Route to create a group
router.post('/create', createGroup);

// Route to fetch all groups
router.get('/all', getAllGroups);

export default router;

import { Router } from 'express';
import { basicSearchResult, createGroup, getAllGroups } from '../controllers/group_controller';
import { changeJoinRequestStatus, joinTheGroup } from '../controllers/joinrequest_controller';


const router: Router = Router();

// Route to create a group
router.post('/create', createGroup);

// Route to fetch all groups
router.get('/all', getAllGroups);

router.get('/basic_search/:text/:student_id', basicSearchResult);

router.post('/join', joinTheGroup)

router.post('/respond-join-request', changeJoinRequestStatus)

export default router;

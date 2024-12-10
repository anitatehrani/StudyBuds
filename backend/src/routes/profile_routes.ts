import { Router } from 'express';
import { getProfileById } from '../controllers/profile_controller';
import { editTelegramId } from '../controllers/student_controller';
import { asyncWrapper } from '../utils/wrapper';

const router: Router = Router();

router.get('/:studentId', asyncWrapper(getProfileById));
router.post('/edit-telegram-id/:id/:telegram_id', asyncWrapper(editTelegramId));



export default router;

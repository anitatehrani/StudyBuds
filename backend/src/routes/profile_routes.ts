import { Router } from 'express';
import { getProfileById } from '../controllers/profile_controller';
import { editTelegramId } from '../controllers/student_controller';

const router: Router = Router();

router.get('/:id', getProfileById); 
router.post('/edit-telegram-id/:id/:telegram_id', editTelegramId); 



export default router;

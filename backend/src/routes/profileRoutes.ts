import { Router } from 'express';
import { getProfileById } from '../controllers/profileController';
import { editTelegramId } from '../controllers/studentController';

const router: Router = Router();

router.get('/:id', getProfileById); 
router.post('/edit-telegram-id/:id/:telegram_id', editTelegramId); 



export default router;

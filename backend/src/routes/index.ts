import { Router, Request, Response } from 'express';
import studentRoutes from './studentRoutes';
import groupRoutes from './groupRoutes';
import profileRoutes from './profileRoutes';


const router: Router = Router();

// Handle favicon requests to prevent unnecessary processing
router.get('/favicon.ico', (req: Request, res: Response) => {
    res.status(204).end(); // No Content
});

// Root route
router.get('/', (req: Request, res: Response) => {
    res.send('Welcome to the StudyBuds API!');
});

router.use('/profile', profileRoutes);

// Mount student routes under "/students"
router.use('/students', studentRoutes);

// Mount group routes under "/groups"
router.use('/groups', groupRoutes);



export default router;

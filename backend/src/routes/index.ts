import { Router } from 'express';
import studentRoutes from './studentRoutes';
import groupRoutes from './groupRoutes';
import courseRoutes from './courseRoutes';

const router: Router = Router();

// Root route
router.get('/', (req, res) => {
    res.send('Welcome to the StudyBuds API!');
});

// Mount student routes under "/students"
router.use('/students', studentRoutes);

// Mount group routes under "/groups"
router.use('/groups', groupRoutes);

// Mount course routes under "/courses"
router.use('/courses', courseRoutes);

export default router;

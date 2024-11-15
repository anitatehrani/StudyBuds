/**
 * Group Routes
 * Defines the API routes for group-related endpoints
 * Written by: Anita and Mahdi
 */

import { Router } from 'express';
import { createGroup } from '../controllers/groupController';

const router: Router = Router();

// Route to create a new group
router.post('/create', createGroup);

export default router;

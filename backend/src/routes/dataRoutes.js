import { Router } from 'express';
import { getCatalogData, getGlobalData } from '../controllers/dataController.js';
import { protect } from '../middleware/authMiddleware.js'; // Import middleware

const router = Router();

// Add 'protect' before the controller functions
router.get('/catalog', protect, getCatalogData);
router.get('/global', protect, getGlobalData);

export default router;
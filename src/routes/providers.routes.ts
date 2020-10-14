import express, { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { protectMiddleware } from '../middlewares/protected.middleware';
import providersController from '../controllers/providers.controller';

const router: Router = express.Router();

router
  .route('/')
  .get(authMiddleware, protectMiddleware, providersController.findAllProviders)
  .post(authMiddleware, protectMiddleware, providersController.createProvider);

router
  .route('/:id')
  .delete(authMiddleware, protectMiddleware, providersController.deleteProvider)
  .get(authMiddleware, protectMiddleware, providersController.findProviderById)
  .patch(authMiddleware, protectMiddleware, providersController.updateProvider);

export default router;

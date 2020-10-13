import express, { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { protectMiddleware } from '../middlewares/protected.middleware'
import providerController from '../controllers/provider.controller';

const router: Router = express.Router();

router
  .route('/')
  .get(authMiddleware, protectMiddleware, providerController.findAllProviders)
  .post(authMiddleware, protectMiddleware, providerController.createProvider);

router
  .route('/:id')
  .delete(authMiddleware, protectMiddleware, providerController.deleteProvider)
  .get(authMiddleware, protectMiddleware, providerController.findProviderById)
  .patch(authMiddleware, protectMiddleware, providerController.updateProvider);

export default router;

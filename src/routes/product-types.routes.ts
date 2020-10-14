import express, { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { protectMiddleware } from '../middlewares/protected.middleware';
import productTypesController from '../controllers/product-types.controller';

const router: Router = express.Router();

router
    .route('/')
    .get(authMiddleware, protectMiddleware, productTypesController.findAllProductTypes)
    .post(authMiddleware, protectMiddleware, productTypesController.createProductType);

router
    .route('/:id')
    .delete(authMiddleware, protectMiddleware, productTypesController.deleteProductType)
    .get(authMiddleware, protectMiddleware, productTypesController.findProductTypeById)
    .patch(authMiddleware, protectMiddleware, productTypesController.updateProductType);

export default router;

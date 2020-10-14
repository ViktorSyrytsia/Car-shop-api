import express, { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { protectMiddleware } from '../middlewares/protected.middleware';
import productsController from '../controllers/products.controller';

const router: Router = express.Router();

router
    .route('/')
    .get(productsController.findAllProducts)
    .post(authMiddleware, protectMiddleware, productsController.createProduct);

router
    .route('/:id')
    .delete(authMiddleware, protectMiddleware, productsController.deleteProduct)
    .get(authMiddleware, protectMiddleware, productsController.findProductById)
    .patch(authMiddleware, protectMiddleware, productsController.updateProduct);

router
    .route('/car/:id')
    .get(productsController.findProductsByCar);
router
    .route('/type/:id')
    .get(productsController.findProductsByType);

export default router;

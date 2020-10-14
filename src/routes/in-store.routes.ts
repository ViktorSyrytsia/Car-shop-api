import express, { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { protectMiddleware } from '../middlewares/protected.middleware';
import inStoreController from '../controllers/in-store.controller';

const router: Router = express.Router();

router
    .route('/')
    .get(inStoreController.findAllInStore)
    .post(authMiddleware, protectMiddleware, inStoreController.addProductToStore);

router
    .route('/:id')
    .delete(authMiddleware, protectMiddleware, inStoreController.removeProductFromStore)
    .get(inStoreController.findInStoreById)
    .patch(authMiddleware, protectMiddleware, inStoreController.updateProductInStore);

// router
//     .route('/car/:id')
//     .get(productsController.findProductsByCar);
// router
//     .route('/type/:id')
//     .get(productsController.findProductsByType);

// router
//     .route('/provider/:id')
//     .get(productsController.findProductsByProvider);

export default router;

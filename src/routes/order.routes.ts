import express, { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { protectMiddleware } from '../middlewares/protected.middleware';
import orderController from '../controllers/order.controller';
import { isOwnerMiddleware } from '../middlewares/is-owner.middleware';

const router: Router = express.Router();

router
    .route('/')
    .get(authMiddleware, protectMiddleware, orderController.findAllOrders)
    .post(authMiddleware, orderController.createOrder);

router
    .route('/:id')
    .delete(authMiddleware, protectMiddleware, orderController.deleteOrder)
    .get(authMiddleware, isOwnerMiddleware, orderController.findOrderById)
    .patch(authMiddleware, protectMiddleware, orderController.updateOrder);

export default router;

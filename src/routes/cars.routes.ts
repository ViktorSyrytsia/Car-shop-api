import express, { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { protectMiddleware } from '../middlewares/protected.middleware';
import carsController from '../controllers/cars.controller';

const router: Router = express.Router();

router
    .route('/')
    .get(authMiddleware, protectMiddleware, carsController.findAllCars)
    .post(authMiddleware, protectMiddleware, carsController.createCar);

router
    .route('/:id')
    .delete(authMiddleware, protectMiddleware, carsController.deleteCar)
    .get(authMiddleware, protectMiddleware, carsController.findCarById)
    .patch(authMiddleware, protectMiddleware, carsController.updateCar);

export default router;

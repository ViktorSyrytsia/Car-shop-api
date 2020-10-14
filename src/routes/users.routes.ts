import express, { Router } from 'express';

import { authMiddleware } from '../middlewares/auth.middleware';
import { isOwnerMiddleware } from '../middlewares/is-owner.middleware';
import usersController from '../controllers/users.controller';

const router: Router = express.Router();

router
    .route('/')
    .get(authMiddleware, usersController.findAllUsers);

router
    .route('/:id')
    .delete(authMiddleware, isOwnerMiddleware, usersController.deleteUser)
    .get(authMiddleware, usersController.findUserById)
    .patch(authMiddleware, isOwnerMiddleware, usersController.updateUser);

export default router;

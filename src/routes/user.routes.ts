import express, { Router } from 'express';
import usersController from '../controllers/users.controller';

const router: Router = express.Router();

router
    .route('/')
    .get(usersController.findAllUsers)
    .post(usersController.createUser)

router.route('/:id').delete(usersController.deleteUser).get(usersController.findUserById).patch(usersController.updateUser)

export default router;

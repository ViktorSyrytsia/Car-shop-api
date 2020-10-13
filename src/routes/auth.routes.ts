import express, { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import authController from '../controllers/auth.controller';

const router: Router = express.Router();

router
  .route('/sign-up')
  .post(authController.signUp);

router
  .route('/sign-in')
  .post(authController.signIn);

router
  .route('/logout')
  .get(authMiddleware, authController.signOut);

export default router;

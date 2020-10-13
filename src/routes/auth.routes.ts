import express, { Router } from 'express';
import authController from '../controllers/auth.controller';

const router: Router = express.Router();

router
  .route('/sign-up')
  .post(authController.signUp);

router
  .route('/sign-in')
  .post(authController.signIn);

export default router;

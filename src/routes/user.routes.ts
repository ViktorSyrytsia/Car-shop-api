import express, { Router } from 'express';
import { getAllUsers } from '../controllers/users.controller';

const router: Router = express.Router();

router
    .route('/')
    .get(getAllUsers);

export default router;

import express, { Router } from 'express';
import { getAllCustomers } from '../controllers/customers.controller';

const router: Router = express.Router();

router
    .route('/')
    .get(getAllCustomers);

export default router;

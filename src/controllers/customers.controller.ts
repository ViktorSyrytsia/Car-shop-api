import { Request, Response } from 'express';

import customerModel from '../models/customer.model';

const getAllCustomers = async (req: Request, res: Response) => {
    const users = await customerModel.find();
    return res.status(200).json({
        users
    });
};

export { getAllCustomers };

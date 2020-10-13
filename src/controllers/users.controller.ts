import { Request, Response } from 'express';

import userModel from '../models/user.model';

const getAllUsers = async (req: Request, res: Response) => {
    const users = await userModel.find();
    return res.status(200).json({
        users
    });
};

export { getAllUsers };

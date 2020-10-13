import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes'

import { User } from 'src/models/user.model';
import userService from '../db/users.service';
import responses from '../helpers/responses';

const findAllUsers = async (_: Request, res: Response) => {
    try {
        const users: User[] = await userService.findAll()
        return responses.success(res, StatusCodes.OK, users)
    } catch (error) {
        return responses.fail(res, error)
    }
};

const findUserById = async (req: Request, res: Response) => {
    try {
        const user: User = await userService.findById(new Types.ObjectId(req.params.id))
        console.log(user);

        return responses.success(res, StatusCodes.OK, user)
    } catch (error) {
        return responses.fail(res, error)
    }
}

const createUser = async (req: Request & { body: User }, res: Response) => {
    try {
        const newUser: User = await userService.create(req.body)
        return responses.success(res, StatusCodes.OK, newUser)
    } catch (error) {
        return responses.fail(res, error)
    }
}

const updateUser = async (req: Request & { body: User }, res: Response) => {
    try {
        const updatedUser: User = await userService.update(new Types.ObjectId(req.params.id), req.body)
        return responses.success(res, StatusCodes.OK, updatedUser)
    } catch (error) {
        return responses.fail(res, error)
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const deletedUser: User = await userService.deleteUser(new Types.ObjectId(req.params.id))
        return responses.success(res, StatusCodes.OK, deletedUser)
    } catch (error) {
        return responses.fail(res, error)
    }
}


export default { findAllUsers, createUser, deleteUser, findUserById, updateUser };

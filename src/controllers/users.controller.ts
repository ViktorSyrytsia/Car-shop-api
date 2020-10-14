import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { DocumentUser } from '../models/user.model';
import usersService from '../db/users.service';
import responses from '../helpers/responses';
import { checkError } from '../helpers/check-error';

const findAllUsers = async (req: Request, res: Response) => {
  try {
    const users: DocumentUser[] = await usersService.findAll(req.query);
    return responses.success(res, StatusCodes.OK, users);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const findUserById = async (req: Request, res: Response) => {
  try {
    const user: DocumentUser = await usersService.findById(new Types.ObjectId(req.params.id));
    console.log(user);

    return responses.success(res, StatusCodes.OK, user);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const updateUser = async (req: Request & { body: DocumentUser }, res: Response) => {
  try {
    const updatedUser: DocumentUser =
      await usersService.update(new Types.ObjectId(req.params.id), req.body);
    return responses.success(res, StatusCodes.OK, updatedUser);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser: DocumentUser =
      await usersService.deleteUser(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, deletedUser);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

export default { findAllUsers, deleteUser, findUserById, updateUser };

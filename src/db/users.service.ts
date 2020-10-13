import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentUser, userModel } from '../models/user.model';

const findAll = async (): Promise<DocumentUser[]> => {
  return await userModel.find();
};

const findByEmail = async (email: string): Promise<DocumentUser> => {
  const user = await userModel.findOne({ email });
  if (!user) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

const findById = async (id: Types.ObjectId): Promise<DocumentUser> => {
  const user = await userModel.findById(id);
  if (!user) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

const create = async (user: CreateQuery<DocumentUser>): Promise<DocumentUser> => {
  try {
    const createdUser = await userModel.create(user);
    return createdUser;
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentUser>)
  : Promise<DocumentUser> => {
  const user = await userModel.findByIdAndUpdate(
    { _id: id },
    { updatedAt: Date.now(), ...body },
    { new: true, useFindAndModify: false }
  );
  if (!user) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

const deleteUser = async (id: Types.ObjectId): Promise<DocumentUser> => {
  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'User not found');
  }
  return user;
};

export default {
  findAll, create, update, deleteUser, findById, findByEmail
};

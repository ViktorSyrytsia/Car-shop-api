import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentUser, userModel } from '../models/user.model';
import queryUpgrade from '../helpers/query-upgrade';

const findAll = async (requestQuery: any): Promise<DocumentUser[]> => {
  try {
    const mongoQuery = new queryUpgrade(userModel.find(), requestQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return await mongoQuery.query;
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const findByEmail = async (email: string): Promise<DocumentUser> => {
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'User not found');
    }
    return user;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const findById = async (id: Types.ObjectId): Promise<DocumentUser> => {
  try {
    const user = await userModel.findById(id);
    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'User not found');
    }
    return user;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const create = async (user: CreateQuery<DocumentUser>): Promise<DocumentUser> => {
  try {
    return await userModel.create(user);
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentUser>)
  : Promise<DocumentUser> => {
  try {
    const user = await userModel.findByIdAndUpdate(
      { _id: id },
      { updatedAt: Date.now(), ...body },
      { new: true, useFindAndModify: false }
    );
    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'User not found');
    }
    return user;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteUser = async (id: Types.ObjectId): Promise<DocumentUser> => {
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'User not found');
    }
    return user;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export default {
  findAll, create, update, deleteUser, findById, findByEmail
};

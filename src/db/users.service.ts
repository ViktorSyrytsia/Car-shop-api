import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes'

import { HttpError } from '../helpers/http-error';
import { User, userModel } from '../models/user.model'

const findAll = async (): Promise<User[]> => {
  return await userModel.find()
}

const findById = async (id: Types.ObjectId): Promise<User> => {
  const user = await userModel.findById(id)
  if (!user) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'User not found')
  }
  return user
}

const create = async (user: CreateQuery<User>): Promise<User> => {
  try {
    const createdUser = await userModel.create(user);
    return createdUser
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message)
  }
}

const update = async (id: Types.ObjectId, body: UpdateQuery<User>): Promise<User> => {
  const user = await userModel.findByIdAndUpdate({ _id: id }, { updatedAt: Date.now(), ...body }, { new: true, useFindAndModify: false })
  if (!user) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'User not found')
  }
  return user
}

const deleteUser = async (id: Types.ObjectId): Promise<User> => {
  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'User not found')
  }
  return user
}

export default {
  findAll, create, update, deleteUser, findById
}
import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentProvider, providerModel } from '../models/provider.model';

const findAll = async (): Promise<DocumentProvider[]> => {
  return await providerModel.find();
};

const findById = async (id: Types.ObjectId): Promise<DocumentProvider> => {
  const provider = await providerModel.findById(id);
  if (!provider) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Provider not found');
  }
  return provider;
};

const create = async (provider: CreateQuery<DocumentProvider>): Promise<DocumentProvider> => {
  try {
    const createdProvider = await providerModel.create(provider);
    return createdProvider;
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentProvider>): Promise<DocumentProvider> => {
  const provider = await providerModel.findByIdAndUpdate({ _id: id }, { updatedAt: Date.now(), ...body }, { new: true, useFindAndModify: false });
  if (!provider) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Provider not found');
  }
  return provider;
};

const deleteProvider = async (id: Types.ObjectId): Promise<DocumentProvider> => {
  const provider = await providerModel.findByIdAndDelete(id);
  if (!provider) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Provider not found');
  }
  return provider;
};

export default {
  findAll, create, update, deleteProvider, findById
};

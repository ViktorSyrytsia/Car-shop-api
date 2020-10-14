import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentProvider, providerModel } from '../models/provider.model';
import queryUpgrade from '../helpers/query-upgrade';

const findAll = async (requestQuery: any): Promise<DocumentProvider[]> => {
  const mongoQuery = new queryUpgrade(providerModel.find(), requestQuery)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await mongoQuery.query;
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
    return await providerModel.create(provider);
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentProvider>)
  : Promise<DocumentProvider> => {
  const provider = await providerModel
    .findByIdAndUpdate(
      { _id: id }, { updatedAt: Date.now(), ...body },
      { new: true, useFindAndModify: false }
    );
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

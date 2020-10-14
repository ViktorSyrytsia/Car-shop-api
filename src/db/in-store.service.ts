import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentInStore, inStoreModel } from '../models/in-store.model';
import queryUpgrade from '../helpers/query-upgrade';

const findAll = async (requestQuery: any): Promise<DocumentInStore[]> => {
  try {
    const mongoQuery =
            new queryUpgrade(
                inStoreModel.find()
                    .populate({ path: 'product', model: 'Product' }),
                requestQuery)
                .filter()
                .sort()
                .limitFields()
                .paginate();
    return await mongoQuery.query;
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const findById = async (id: Types.ObjectId): Promise<DocumentInStore> => {
  const productInStore = await inStoreModel.findById(id);
  if (!productInStore) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  return productInStore;
};

const addToStore = async (productInStore: CreateQuery<DocumentInStore>)
    : Promise<DocumentInStore> => {
  try {
    return await inStoreModel.create(productInStore);
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentInStore>)
    : Promise<DocumentInStore> => {
  const productInStore = await inStoreModel
        .findByIdAndUpdate(
            { _id: id }, { updatedAt: Date.now(), ...body },
            { new: true, useFindAndModify: false }
        );
  if (!productInStore) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  return productInStore;
};

const removeFromStore = async (id: Types.ObjectId): Promise<DocumentInStore> => {
  const product = await inStoreModel.findByIdAndDelete(id);
  if (!product) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  return product;
};

export default {
  findAll, addToStore, update, removeFromStore, findById
};

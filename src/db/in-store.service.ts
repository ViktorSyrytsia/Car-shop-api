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
          .populate({
            path: 'product', model: 'Product', populate: [
              { path: 'car', model: 'Car' },
              { path: 'provider', model: 'Provider' },
              { path: 'type', model: 'ProductType' }]
          }),
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

const findById = async (id: Types.ObjectId, requestQuery: any): Promise<DocumentInStore> => {
  try {
    const mongoQuery = new queryUpgrade(inStoreModel.findById(id).populate({
      path: 'product', model: 'Product', populate: [
        { path: 'car', model: 'Car' },
        { path: 'provider', model: 'Provider' },
        { path: 'type', model: 'ProductType' }]
    }),                                 requestQuery)
      .limitFields();
    const productInStore = await mongoQuery.query;
    if (!productInStore) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
    }
    return productInStore;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const addToStore = async (productInStore: CreateQuery<DocumentInStore>)
  : Promise<DocumentInStore> => {
  try {
    return await inStoreModel.create(productInStore);
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentInStore>, requestQuery: any)
  : Promise<DocumentInStore> => {
  try {
    const mongoQuery = new queryUpgrade(inStoreModel
      .findByIdAndUpdate(
        { _id: id }, { updatedAt: Date.now(), ...body },
        { new: true, useFindAndModify: false }
      ).populate({
        path: 'product', model: 'Product', populate: [
          { path: 'car', model: 'Car' },
          { path: 'provider', model: 'Provider' },
          { path: 'type', model: 'ProductType' }]
      }),                               requestQuery)
      .limitFields();
    const productInStore = await mongoQuery.query;
    if (!productInStore) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
    }
    return productInStore;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const removeFromStore = async (id: Types.ObjectId): Promise<DocumentInStore> => {
  try {
    const product = await inStoreModel.findByIdAndDelete(id);
    if (!product) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
    }
    return product;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export default {
  findAll, addToStore, update, removeFromStore, findById
};

import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentProductType, productTypeModel } from '../models/product-type.model';
import queryUpgrade from '../helpers/query-upgrade';

const findAll = async (requestQuery: any): Promise<DocumentProductType[]> => {
  try {
    const mongoQuery = new queryUpgrade(productTypeModel.find(), requestQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return await mongoQuery.query;
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const findById = async (id: Types.ObjectId): Promise<DocumentProductType> => {
  try {
    const productType = await productTypeModel.findById(id);
    if (!productType) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Type not found');
    }
    return productType;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const create = async (productType: CreateQuery<DocumentProductType>)
  : Promise<DocumentProductType> => {
  try {
    return await productTypeModel.create(productType);
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentProductType>)
  : Promise<DocumentProductType> => {
  try {
    const productType = await productTypeModel
      .findByIdAndUpdate(
        { _id: id }, { updatedAt: Date.now(), ...body },
        { new: true, useFindAndModify: false }
      );
    if (!productType) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Type not found');
    }
    return productType;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteProductType = async (id: Types.ObjectId): Promise<DocumentProductType> => {
  try {
    const productType = await productTypeModel.findByIdAndDelete(id);
    if (!productType) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Type not found');
    }
    return productType;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export default {
  findAll, create, update, deleteProductType, findById
};

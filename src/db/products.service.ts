import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentProduct, productModel } from '../models/product.model';
import queryUpgrade from '../helpers/query-upgrade';

const findAll = async (requestQuery: any): Promise<DocumentProduct[]> => {
  const mongoQuery = new queryUpgrade(productModel.find(), requestQuery)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await mongoQuery.query;
};

const findByCar = async (carId: Types.ObjectId, requestQuery: any): Promise<DocumentProduct[]> => {
  const mongoQuery = new queryUpgrade(productModel.find({ car: carId }), requestQuery)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await mongoQuery.query;
};

const findByProductType = async (productTypeId: Types.ObjectId, requestQuery: any)
  : Promise<DocumentProduct[]> => {
  const mongoQuery = new queryUpgrade(productModel.find({ type: productTypeId }), requestQuery)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  return await mongoQuery.query;
};

const findById = async (id: Types.ObjectId): Promise<DocumentProduct> => {
  const product = await productModel.findById(id);
  if (!product) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  return product;
};

const create = async (product: CreateQuery<DocumentProduct>): Promise<DocumentProduct> => {
  try {
    return await productModel.create(product);
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentProduct>)
  : Promise<DocumentProduct> => {
  const product = await productModel
    .findByIdAndUpdate(
      { _id: id }, { updatedAt: Date.now(), ...body },
      { new: true, useFindAndModify: false }
    );
  if (!product) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  return product;
};

const deleteProduct = async (id: Types.ObjectId): Promise<DocumentProduct> => {
  const product = await productModel.findByIdAndDelete(id);
  if (!product) {
    throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
  }
  return product;
};

export default {
  findAll, create, update, deleteProduct, findById, findByCar, findByProductType
};

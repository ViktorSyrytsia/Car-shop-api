import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentProduct, productModel } from '../models/product.model';
import queryUpgrade from '../helpers/query-upgrade';
import providersService from './providers.service';
import productTypesService from './product-types.service';
import carsService from './cars.service';

const findAll = async (requestQuery: any): Promise<DocumentProduct[]> => {
  try {
    const mongoQuery =
      new queryUpgrade(
        productModel
          .find()
          .populate({ path: 'car', model: 'Car' })
          .populate({ path: 'provider', model: 'Provider' })
          .populate({ path: 'type', model: 'ProductType' }),
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

const findByCar = async (carId: Types.ObjectId, requestQuery: any): Promise<DocumentProduct[]> => {
  try {
    const car = await carsService.findById(carId);
    if (!car) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Car not found');
    }
    const mongoQuery = new queryUpgrade(
      productModel.
        find({ car: carId })
        .populate({ path: 'car', model: 'Car' })
        .populate({ path: 'provider', model: 'Provider' })
        .populate({ path: 'type', model: 'ProductType' }),
      requestQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return await mongoQuery.query;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const findByProductType = async (productTypeId: Types.ObjectId, requestQuery: any)
  : Promise<DocumentProduct[]> => {
  try {
    const productType = await productTypesService.findById(productTypeId);
    if (!productType) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Product type not found');
    }
    const mongoQuery = new queryUpgrade(
      productModel
        .find({ type: productTypeId })
        .populate({ path: 'car', model: 'Car' })
        .populate({ path: 'provider', model: 'Provider' })
        .populate({ path: 'type', model: 'ProductType' }),
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

const findByProvider = async (providerId: Types.ObjectId, requestQuery: any)
  : Promise<DocumentProduct[]> => {
  try {
    const provider = await providersService.findById(providerId);
    if (!provider) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Provider not found');
    }
    const mongoQuery = new queryUpgrade(
      productModel
        .find({ provider: providerId })
        .populate({ path: 'car', model: 'Car' })
        .populate({ path: 'provider', model: 'Provider' })
        .populate({ path: 'type', model: 'ProductType' }),
      requestQuery)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    return await mongoQuery.query;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const findById = async (id: Types.ObjectId, requestQuery: any): Promise<DocumentProduct> => {
  try {
    const mongoQuery =
      new queryUpgrade(
        productModel
          .findById(id)
          .populate({ path: 'car', model: 'Car' })
          .populate({ path: 'provider', model: 'Provider' })
          .populate({ path: 'type', model: 'ProductType' }),
        requestQuery)
        .limitFields();
    const product = await mongoQuery.query;
    if (!product) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
    }
    return product;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const create = async (product: CreateQuery<DocumentProduct>): Promise<DocumentProduct> => {
  try {
    return await productModel.create(product);
  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentProduct>, requestQuery: any)
  : Promise<DocumentProduct> => {
  try {
    const mongoQuery =
      new queryUpgrade(
        productModel
          .findByIdAndUpdate(
            { _id: id }, { updatedAt: Date.now(), ...body },
            { new: true, useFindAndModify: false }
          )
          .populate({ path: 'car', model: 'Car' })
          .populate({ path: 'provider', model: 'Provider' })
          .populate({ path: 'type', model: 'ProductType' }),
        requestQuery)
        .limitFields();
    const product: DocumentProduct = await mongoQuery.query;
    if (!product) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
    }
    return product;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const deleteProduct = async (id: Types.ObjectId): Promise<DocumentProduct> => {
  try {
    const product = await productModel.findByIdAndDelete(id);
    if (!product) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Product not found');
    }
    return product;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

export default {
  findAll, create, update, deleteProduct, findById, findByCar, findByProductType, findByProvider
};

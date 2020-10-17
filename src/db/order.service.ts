import { Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentOrder, orderModel } from '../models/order.model';
import queryUpgrade from '../helpers/query-upgrade';
import { DocumentProduct } from 'src/models/product.model';
import productsService from './products.service';

const findAll = async (requestQuery?: any): Promise<DocumentOrder[]> => {
  try {
    const mongoQuery = new queryUpgrade(
      orderModel
        .find()
        .populate({ path: 'customer', model: 'User' })
        .populate({ path: 'products', model: 'Product' }),
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

const findByStatus = async (status: string, requestQuery?: any): Promise<DocumentOrder[]> => {
  try {
    const mongoQuery = new queryUpgrade(
      orderModel.find({ status })
        .populate({ path: 'customer', model: 'User' })
        .populate({ path: 'products', model: 'Product' }),
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

const findByCustomer = async (customer: Types.ObjectId, requestQuery?: any)
  : Promise<DocumentOrder[]> => {
  try {
    const mongoQuery = new queryUpgrade(
      orderModel.find({ customer })
        .populate({ path: 'customer', model: 'User' })
        .populate({ path: 'products', model: 'Product' }),
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

const findById = async (id: Types.ObjectId): Promise<DocumentOrder> => {
  try {
    const order = await orderModel.findById(id);
    if (!order) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Order not found');
    }
    return order;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const create = async (requestBody: any, userId: Types.ObjectId)
  : Promise<DocumentOrder> => {
  try {
    const products = [];
    for (const element of requestBody.products) {
      const prod: DocumentProduct = await productsService.findById(new Types.ObjectId(element));
      if (prod.quantity === 0) {
        throw new Error(`Product: ${element.name} is over`);
      }
      await productsService.update(
        prod._id,
        { $inc: { quantity: -1 } },
        {});
      products.push(prod);
    }
    return await orderModel.create({
      products,
      customer: userId,
      summary: products.reduce((acc, pr) => acc + pr.price, 0),
      ...requestBody
    });

  } catch (error) {
    throw new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }
};

const update = async (id: Types.ObjectId, body: UpdateQuery<DocumentOrder>)
  : Promise<DocumentOrder> => {
  try {
    const order = await orderModel
      .findByIdAndUpdate(
        { _id: id }, { updatedAt: Date.now(), ...body },
        { new: true, useFindAndModify: false }
      )
      .populate({ path: 'customer', model: 'User' })
      .populate({ path: 'products', model: 'Product' });
    if (!order) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Order not found');
    }
    return order;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }

};

const deleteOrder = async (id: Types.ObjectId): Promise<DocumentOrder> => {
  try {
    const order = await orderModel.findByIdAndDelete(id);
    if (!order) {
      throw new HttpError(StatusCodes.NOT_FOUND, 'Order not found');
    }
    return order;
  } catch (error) {
    throw new HttpError(error.code || StatusCodes.INTERNAL_SERVER_ERROR, error.message);
  }

};

export default {
  findAll, create, update, deleteOrder, findById, findByStatus, findByCustomer
};

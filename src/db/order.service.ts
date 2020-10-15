import { CreateQuery, Types, UpdateQuery } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import { DocumentOrder, orderModel } from '../models/order.model';
import queryUpgrade from '../helpers/query-upgrade';

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

const create = async (order: CreateQuery<DocumentOrder>): Promise<DocumentOrder> => {
  try {
    return await orderModel.create(order);
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

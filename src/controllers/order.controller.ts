import { Request, Response } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { DocumentOrder } from '../models/order.model';
import responses from '../helpers/responses';
import orderService from '../db/order.service';
import { checkError } from '../helpers/check-error';

const findAllOrders = async (req: Request, res: Response) => {
  try {
    const orders: DocumentOrder[] = await orderService.findAll(req.query);
    return responses.success(res, StatusCodes.OK, orders);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const findOrdersByStatus = async (req: Request, res: Response) => {
  try {
    const orders: DocumentOrder[] =
      await orderService.findByStatus(req.params.status, req.query);
    return responses.success(res, StatusCodes.OK, orders);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const findOrdersByCustomer = async (req: Request, res: Response) => {
  try {
    const orders: DocumentOrder[] =
      await orderService.findByCustomer(new Types.ObjectId(req.params.id), req.query);
    return responses.success(res, StatusCodes.OK, orders);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const findOrderById = async (req: Request, res: Response) => {
  try {
    const order: DocumentOrder =
      await orderService.findById(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, order);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const findMyOrders = async (req: Request, res: Response) => {
  try {
    const myOrders: DocumentOrder[] =
      await orderService.findByCustomer(new Types.ObjectId(req.session!.userId), req.query);
    return responses.success(res, StatusCodes.OK, myOrders);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const createOrder = async (req: Request, res: Response) => {
  try {
    const newOrder: DocumentOrder =
      await orderService.create(req.body, new Types.ObjectId(req.session!.userId));
    return responses.success(res, StatusCodes.OK, newOrder);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const updateOrder = async (req: Request & { body: DocumentOrder }, res: Response) => {
  try {
    const updatedOrder: DocumentOrder =
      await orderService.update(new Types.ObjectId(req.params.id), req.body);
    return responses.success(res, StatusCodes.OK, updatedOrder);
  } catch (error) {
    return responses.fail(res, checkError(error.message));
  }
};

const deleteOrder = async (req: Request, res: Response) => {
  try {
    const deletedOrder: DocumentOrder =
      await orderService.deleteOrder(new Types.ObjectId(req.params.id));
    return responses.success(res, StatusCodes.OK, deletedOrder);
  } catch (error) {
    return responses.fail(res, error);
  }
};

export default {
  findAllOrders, findOrderById,
  deleteOrder, updateOrder, createOrder,
  findOrdersByStatus, findOrdersByCustomer,
  findMyOrders
};

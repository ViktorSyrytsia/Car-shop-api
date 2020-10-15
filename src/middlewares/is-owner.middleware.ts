import { NextFunction, Response, Request } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import responses from '../helpers/responses';
import usersService from '../db/users.service';
import orderService from '../db/order.service';
import { DocumentOrder } from '../models/order.model';

export const isOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = new Types.ObjectId(req.session!.userId);
  const user = await usersService.findById(userId);
  const userOwner = await usersService.findById(new Types.ObjectId(req.params.id));
  const orderOwner: DocumentOrder[] =
    await orderService.findByCustomer(new Types.ObjectId(req.params.id), req.query)

  if (new Types.ObjectId(user?._id).equals(new Types.ObjectId(userOwner?._id))
    || new Types.ObjectId(user?._id).equals(new Types.ObjectId(orderOwner[0]?._id))) {
    next();
  } else {
    responses.fail(res, new HttpError(StatusCodes.FORBIDDEN, 'You dont have permission to do it'));
  }
};

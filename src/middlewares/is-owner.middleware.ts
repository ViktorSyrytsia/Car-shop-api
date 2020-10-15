import { NextFunction, Response, Request } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import responses from '../helpers/responses';
import { userModel } from '../models/user.model';

export const isOwnerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = new Types.ObjectId(req.session!.userId);
  const user = await userModel.findById(userId);
  const resursOwner = await userModel.findById(new Types.ObjectId(req.params.id));

  if (new Types.ObjectId(user?._id).equals(new Types.ObjectId(resursOwner?._id))) {
    next();
  } else {
    responses.fail(res, new HttpError(StatusCodes.FORBIDDEN, 'You dont have permission to do it'));
  }
};

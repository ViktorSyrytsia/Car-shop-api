import { NextFunction, Response, Request } from 'express';
import { Types } from 'mongoose';
import { StatusCodes } from 'http-status-codes';

import { HttpError } from '../helpers/http-error';
import responses from '../helpers/responses';
import { userModel } from '../models/user.model';

export const protectMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const userId = new Types.ObjectId(req.session!.userId);
  const user = await userModel.findById(userId);
  if (user!.role !== 'admin') {
    responses.fail(res, new HttpError(StatusCodes.FORBIDDEN, 'You dont have permission to do it'));
  } else {
    next();
  }
};

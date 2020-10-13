import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import argon2 from 'argon2';

import { DocumentUser } from '../models/user.model';
import usersService from '../db/users.service';
import responses from '../helpers/responses';
import { HttpError } from '../helpers/http-error';

const signUp = async (req: Request, res: Response) => {
  try {
    const hashPassword = await argon2.hash(req.body.password);
    const newUser: DocumentUser = await usersService.create(
      { ...req.body, password: hashPassword, }
    );
    req.session!.userId = newUser._id;
    return responses.success(res, StatusCodes.OK, newUser);
  } catch (error) {
    return responses.fail(res, error);
  }
};

const signIn = async (req: Request, res: Response) => {
  try {
    const user: DocumentUser = await usersService.findByEmail(req.body.email);
    if (await argon2.verify(user.password, req.body.password)) {
      req.session!.userId = user._id;
      return responses.success(res, StatusCodes.OK, user);
    }
    return responses.fail(
      res, new HttpError(StatusCodes.UNAUTHORIZED, 'Wrong email or password')
    );

  } catch (error) {
    return responses.fail(res, error);
  }
};

export default { signUp, signIn };

import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import argon2 from 'argon2';

import { DocumentUser } from '../models/user.model';
import usersService from '../db/users.service';
import responses from '../helpers/responses';
import { HttpError } from '../helpers/http-error';
import { Error } from 'mongoose';


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
    return responses.fail(res, new HttpError(StatusCodes.UNAUTHORIZED, 'Wrong email or password'));
  } catch (error) {
    return responses.fail(res, error);
  }
};

const signOut = async (req: Request, res: Response) => {
  try {
    res.clearCookie(process.env.SESSION_COOKIE_ID as string);
    req.session!.destroy((err) => {
      if (err) {
        throw new Error(`Session error: ${err}`)
      }
    })
    return responses.success(res, StatusCodes.OK, {});
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: "fail",
      message: error.message
    })
  }
};

export default { signUp, signIn, signOut };

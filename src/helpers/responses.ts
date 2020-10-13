import { Response } from 'express';
import { HttpError } from './http-error';

const success = (res: Response, code: number, json?: Object) => {
  return res.status(code).json({
    status: 'ok',
    data: json
  });
};

const fail = (res: Response, httpError: HttpError) => {
  return res.status(httpError.code).json({
    status: 'failed',
    code: httpError.code,
    message: httpError.message
  });
};

export default { success, fail };

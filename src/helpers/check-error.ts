import { StatusCodes } from 'http-status-codes';
import { HttpError } from './http-error';

export const checkError = (errorMessage: string) => {
  if (errorMessage.includes('Argument passed in must be a single String of 12 bytes or a string of 24 hex characters')) {
    return new HttpError(StatusCodes.BAD_REQUEST, errorMessage);
  }
  return new HttpError(StatusCodes.INTERNAL_SERVER_ERROR, errorMessage);

};

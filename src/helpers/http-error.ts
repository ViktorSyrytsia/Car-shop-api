import { INTERNAL_SERVER_ERROR } from 'http-status-codes';

export class HttpError extends Error {

  public readonly status: string = 'fail';
  public readonly code: number;
  public readonly message: string;

  constructor(code: number, message: string) {
    super(message);
    if (!code) {
      this.code = INTERNAL_SERVER_ERROR;
    } else {
      this.code = code;
    }
  }
}

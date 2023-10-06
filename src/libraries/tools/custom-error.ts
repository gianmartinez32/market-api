import { ErrorItem } from '@interfaces/IError';

export default class ErrorResponse extends Error {
  code: string;

  status: number;

  message: string;

  error: boolean;

  constructor({
    code,
    message,
    status = 500,
    isOperational = false,
  }: ErrorItem) {
    super(message);
    this.code = code;
    this.status = status;
    this.message = message;
    this.error = true;
  }

  getErrorResponse() {
    return {
      message : this.message,
      code    : this.code,
      error   : this.error,
    };
  }
}

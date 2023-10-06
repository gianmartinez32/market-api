import { ErrorCodes, TypeErrors } from '@libraries/constants/error-codes';
import { ErrorRequestHandler } from 'express';

export const errorRequestHandler: ErrorRequestHandler = (error, req, res, next) => {
  const isError = Boolean(error?.stack);

  if (isError) {
    return res.status(400).json({
      code: ErrorCodes.GENERAL, tipoError: TypeErrors.TECNICO, message: error.message, status: 400,
    });
  }

  const { status } = error;
  return res.status(status).json(error);
};

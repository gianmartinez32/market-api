import { ErrorCodes, ResponseStstus, TypeErrors } from '@libraries/constants/error-codes';

const playerErrors = {
  playerNotFound: {
    tipoError : ErrorCodes.USER_NOT_FOUND,
    code      : TypeErrors.NOTFOUND,
    message   : 'El usuario no se encuentra registrado',
    status    : ResponseStstus.BAD_REQUEST,
  },
};

export default playerErrors;

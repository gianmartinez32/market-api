import { ErrorCodes, ResponseStstus, TypeErrors } from '@libraries/constants/error-codes';

const newErrors = {
  ErrorPrueba: {
    tipoError : ErrorCodes.GENERAL,
    code      : TypeErrors.TECNICO,
    message   : 'OCURRIO UN ERROR AL OBTENER LAS NOVEDADES',
    status    : ResponseStstus.SUCCESS,
  },
};

export default newErrors;

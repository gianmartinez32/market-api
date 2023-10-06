import { TypeErrors } from '@libraries/constants/error-codes';

const joiErrors = {
  unevaluatedFields(type: 'body' | 'query' | 'params' | 'headers') {
    return {
      code      : `UNVALIDATED_${type.toUpperCase()}_CONTENT`,
      tipoError : TypeErrors.INVALID_VALUES,
      message   : `Incoming <${type}> data in not being validated`,
      status    : 400,
    };
  },

  invalidFields(error: Array<string>, type: string) {
    return {
      code      : `INVALID_${type.toUpperCase()}_CONTENT`,
      tipoError : TypeErrors.INVALID_VALUES,
      message   : error,
      status    : 400,
    };
  },
};

export default joiErrors;

import { Schema } from 'joi';
import { Response, Request, NextFunction } from 'express';

import joiErrors from '@libraries/errors/joi.error';
import objectTools from '@libraries/tools/object.tools';
import { Mutable } from '@interfaces/IMutable';

export const validateSchema = (
    schemas: Partial<Record<keyof Request, Schema>>,
) => {
  const validationOptions = {
    abortEarly   : false, // abort after the last validation error
    allowUnknown : true, // allow unknown keys that will be ignored
    stripUnknown : true, // remove unknown keys from the validated data
  };

  return (req: Mutable<Request>, res: Response, next: NextFunction) => {
    let joiError: any = null;

    Object.entries(schemas).every(([ source, schema ]) => {
      if (schema) {
        const { error, value } = schema.validate(
          objectTools.getProperty(req, source as keyof Request),
          validationOptions,
        );

        if (error) {
          const allErrors: Array<string> = error.details.map(({ message }) => `Error in ${message}`);
          joiError = joiErrors.invalidFields(allErrors, source);
          return false;
        }
        objectTools.setProperty(req, source as keyof Request, value);
        return true;
      }
      return false;
    });

    if (joiError) {
      return next(joiError);
    }

    return next();
  };
};

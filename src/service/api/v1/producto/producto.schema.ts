import Joi from 'joi';

export const createProducto = {
  body: Joi.object({
    nombre            : Joi.string().min(1).required(),
    descripcion       : Joi.string().min(1).required(),
    precio            : Joi.number().min(1).required(),
    cantidad_en_stock : Joi.number().min(1).required(),
  }),
};

export const updateProducto = {
  params: Joi.object({
    codigo: Joi.string().min(1).required(),
  }),
  body: Joi.object({
    nombre            : Joi.string().min(1).required(),
    descripcion       : Joi.string().min(1).required(),
    precio            : Joi.number().min(1).required(),
    cantidad_en_stock : Joi.number().min(1).required(),
  }),
};

export const getProduct = {
  params: Joi.object({
    codigo: Joi.number().min(1).required(),
  }),
};

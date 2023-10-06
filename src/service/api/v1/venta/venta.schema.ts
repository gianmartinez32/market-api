import Joi from 'joi';

export const createVenta = {
  body: Joi.object({
    nombre_cliente   : Joi.string().min(1).required(),
    telefono_cliente : Joi.string().min(1).required(),
    cantidad_vendida : Joi.number().min(1).required(),
    codigo_producto  : Joi.number().min(1).required(),
  }),
};

export const updateVenta = {
  params: Joi.object({
    codigo: Joi.number().min(1).required(),
  }),
  body: Joi.object({
    nombre_cliente   : Joi.string().min(1).required(),
    telefono_cliente : Joi.string().min(1).required(),
    cantidad_vendida : Joi.number().min(1).required(),
    codigo_producto  : Joi.number().min(1).required(),
    fecha_venta      : Joi.date().min(1).required(),
    total_venta      : Joi.number().min(1).required(),

  }),
};

export const getVenta = {
  params: Joi.object({
    codigo: Joi.string().min(1).required(),
  }),
};

import Joi from 'joi';

export const createPlayer = {
  query: Joi.object({
    id : Joi.string().min(1).required(),
    nombre: Joi.string().min(1).required(),
    puntuacion: Joi.number().min(1).optional(),
  }),
};

export const updatePlayer = {
    query:Joi.object({
        puntuacion: Joi.number().min(1).required(),
        id: Joi.string().min(1).required()
    })
}

export const getPlayer = {
    query:Joi.object({
        id: Joi.number().min(1).required()
    })
}
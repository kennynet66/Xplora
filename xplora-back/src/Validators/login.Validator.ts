import joi from 'joi';

export const loginValidator = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})
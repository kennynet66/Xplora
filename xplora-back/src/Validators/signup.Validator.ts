import joi from 'joi';

export const signupValidator = joi.object({
    full_name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
})
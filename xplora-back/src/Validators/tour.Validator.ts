import joi from 'joi';

export const tourValidator = joi.object({
    tour_title: joi.string().required(),
    tour_dest: joi.string().required(), 
    tour_desc: joi.string().required(), 
    tour_img: joi.string().required(), 
    start_date: joi.string().required(),
    end_date: joi.string().required()
})
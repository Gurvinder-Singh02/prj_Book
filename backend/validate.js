const Joi = require('joi');

//joi validation
const joiSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    PublishYear: Joi.number().required()
});

module.exports = joiSchema;
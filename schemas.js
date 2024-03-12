const Joi = require('joi');
module.exports.bookSchema = Joi.object({
    book: Joi.object({
        title: Joi.string().required(),
        isbn: Joi.number().required().min(0),
        // cover: Joi.string().required(),
        author: Joi.string().required(),
        publication: Joi.string().required()
    }).required()
})

module.exports.issueSchema = Joi.object({
    issue: Joi.object({
        userRegNo: Joi.string().required(),
        userName: Joi.string().required(),
        userExpDate: Joi.string().required(),
        title: Joi.string().required(),
        isbn: Joi.number().required().min(0),
        author: Joi.string().required(),
        publication: Joi.string().required()
    }).required()
})
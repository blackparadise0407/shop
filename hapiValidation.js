const Joi = require('@hapi/joi');

const regValidation = data => {
    const schema = Joi.object({
        firstName: Joi.string().min(3).required(),
        lastName: Joi.string().min(3).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const logValidation = data => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).required()
    })
    return schema.validate(data);
}

const addProductValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        category: Joi.string().required(),
        stock: Joi.number().integer().min(0),
        price: Joi.number().integer().min(0),
        description: Joi.string()

    })
    return schema.validate(data);
}


const addCatValidation = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required()
    })
    return schema.validate(data);
}

module.exports = {
    regValidation,
    logValidation,
    addProductValidation,
    addCatValidation
};

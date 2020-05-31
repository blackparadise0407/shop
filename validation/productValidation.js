const Joi = require('@hapi/joi');

const addProduct = data => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(255).required(),
        category: Joi.string().required(),
        stock: Joi.number().integer().min(0),
        price: Joi.number().integer().min(0),
        description: Joi.string()

    })
    return schema.validate(data);
}

module.exports = {
    addProduct
};

const Joi = require('@hapi/joi');

const addCat = data => {
    const schema = Joi.object({
        catID: Joi.number().integer().min(1).required(),
        name: Joi.string().min(3).max(255).required()
    })
    return schema.validate(data);
}

module.exports = {
    addCat
};

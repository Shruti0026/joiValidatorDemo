const Joi = require('@hapi/joi')

const validator = (schema) => (payload) =>
    schema.validate(payload, { abortEarly: false });

const signupSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required(),
    confirmPassword: Joi.ref("password")

});

const addProductSchema = Joi.object({
    productName: Joi.string().required(),
    price: Joi.number().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(3).max(10).required()
})
exports.validateSignup = validator(signupSchema);
exports.validateAddProduct = validator(addProductSchema);
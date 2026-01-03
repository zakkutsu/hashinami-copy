const Joi = require('joi');

exports.registerSchema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(), // Minimal 6 huruf
    email: Joi.string().email().required(),
    full_name: Joi.string().min(3).optional()
});

exports.loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});
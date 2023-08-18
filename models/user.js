const { Schema, model } = require('mongoose');

const Joi = require("joi");

const { handleMongoError, hashPassword } = require("../helpers");

const createUserJoiSchema = Joi.object({
    name: Joi.string()
        .pattern(/^[a-zA-Zа-яА-ЯїЇіІєЄґҐ' -]+$/)
        .empty('')
        .required()
        .messages({
            'string.pattern.base': 'Invalid name format',
            'any.required': 'Name is required',
        }),
    email: Joi.string()
        .email()
        .empty('')
        .required()
        .messages({
            'string.email': 'Invalid email address',
            'any.required': 'Email is required',
        }),
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d]+$/)
        .empty('')
        .required()
        .messages({
            'string.pattern.base': 'Password must include at least one latin letter and one digit',
            'string.min': 'Password must be at least 8 characters long',
            'any.required': 'Password is required',
        }),
});

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
}, {
    versionKey: false
});


userSchema.pre('save', hashPassword);

userSchema.post("save", handleMongoError);

const User = model('user', userSchema);

module.exports = {
    User,
    createUserJoiSchema,
};
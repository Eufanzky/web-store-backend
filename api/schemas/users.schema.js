const Joi = require('joi');

const userId = Joi.string().uuid();
const name = Joi.string().min(2).max(50);
const gender = Joi.string().min(2).max(50);
const age = Joi.number().integer().max(100);
const email = Joi.string().email({
  minDomainSegments: 2,
  tlds: { allow: ['com', 'net'] },
});

const createUserSchema = Joi.object({
  name: name.required(),
  gender: gender.required(),
  age: age.required(),
  email: email.required(),
});

const updateUserSchema = Joi.object({
  name: name,
  gender: gender,
  age: age,
  email: email,
});

const getUserSchema = Joi.object({
  userId: userId.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };

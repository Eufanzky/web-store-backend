const Joi = require('joi');

const userId = Joi.number().integer();
// const name = Joi.string().min(2).max(50);
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);

const createUserSchema = Joi.object({
  // name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  // name: name,
  email: email,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  userId: userId.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };

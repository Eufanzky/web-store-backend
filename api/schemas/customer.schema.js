const Joi = require('joi');

const customerId = Joi.number().integer();
const name = Joi.string().min(3).max(100);
const lastName = Joi.string().min(3).max(100);
const phone = Joi.string().min(3).max(15);

const userId= Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);



const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  user: Joi.object({
    email: email.required(),
    password: password.required(),
  })
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  phone: phone,
  userId: userId,
});

const getCustomerSchema = Joi.object({
  customerId: customerId.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema };

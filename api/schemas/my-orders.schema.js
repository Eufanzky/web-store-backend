const Joi = require('joi');

const myOrderId = Joi.number().integer();
const name = Joi.string().min(3).max(50);


const createMyOrderSchema = Joi.object({
  name: name.required(),
  // productsArray: productsArray.required(),
});

const updateMyOrderSchema = Joi.object({
  name: name,
  // productsArray: productsArray,
});

const getMyOrderSchema = Joi.object({
  myOrderId: myOrderId.required(),
});

module.exports = { createMyOrderSchema, updateMyOrderSchema, getMyOrderSchema };

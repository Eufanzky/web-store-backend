const Joi = require('joi');

const orderId = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const productsArray = Joi.array().items(
  Joi.object({
    productId: Joi.string().uuid(),
    name: Joi.string().min(3).max(15),
    price: Joi.number().integer().min(10),
    image: Joi.string().uri(),
  }),
);

const createMyOrderSchema = Joi.object({
  name: name.required(),
  productsArray: productsArray.required(),
});

const updateMyOrderSchema = Joi.object({
  name: name,
  productsArray: productsArray,
});

const getMyOrderSchema = Joi.object({
  orderId: orderId.required(),
});

module.exports = { createMyOrderSchema, updateMyOrderSchema, getMyOrderSchema };

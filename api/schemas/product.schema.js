const Joi = require('joi');

const productId = Joi.number().integer();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const isBlocked = Joi.bool();

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlocked: isBlocked.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  isBlocked: isBlocked,
});

const getProductSchema = Joi.object({
  productId: productId.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };

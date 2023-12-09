const Joi = require('joi');

const productId = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();

const createShoppingCartSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});

const updateShoppingCartSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});

const getShoppingCartSchema = Joi.object({
  productId: productId.required(),
});

module.exports = {
  createShoppingCartSchema,
  updateShoppingCartSchema,
  getShoppingCartSchema,
};

const Joi = require('joi');

const shoppingCartId = Joi.number().integer();
const name = Joi.string().min(3).max(50);


const createShoppingCartSchema = Joi.object({
  name: name.required(),
});

const updateShoppingCartSchema = Joi.object({
  name: name,
});

const getShoppingCartSchema = Joi.object({
  shoppingCartId: shoppingCartId.required(),
});

module.exports = {
  createShoppingCartSchema,
  updateShoppingCartSchema,
  getShoppingCartSchema,
};

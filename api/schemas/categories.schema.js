const Joi = require('joi');

const categoryId = Joi.number().integer();
const name = Joi.string().min(3).max(30);

const createCategorySchema = Joi.object({
  name: name.required(),
});

const updateCategorySchema = Joi.object({
  name: name,
});

const getCategorySchema = Joi.object({
  categoryId: categoryId.required(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
};

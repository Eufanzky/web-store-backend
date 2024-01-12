const express = require('express');

const CategoriesService = require('../services/categories.service');
const validatorHandler = require('../middlewares/validator.handler');
const { checkAdminRole } = require('../middlewares/auth.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/categories.schema');
const passport = require('passport');

const router = express.Router();
const service = new CategoriesService();

//Categories
router.get('/', async (req, res) => {
  const categories = await service.find();
  res.status(200).json(categories);
});
router.get(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await service.findOne(categoryId);
      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  checkAdminRole,
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json(newCategory);
    } catch (error) {
      next(error);
    }
  },
);

router.patch(
  '/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res) => {
    const { categoryId } = req.params;
    const body = req.body;
    const category = await service.update(categoryId, body);
    res.status(200).json(category);
  },
);

router.delete('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const result = await service.delete(categoryId);
  res.status(200).json(result);
});

module.exports = router;

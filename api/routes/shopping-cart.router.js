const express = require('express');

const ShoppingCartService = require('../services/shopping-cart.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createShoppingCartSchema,
  updateShoppingCartSchema,
  getShoppingCartSchema,
} = require('../schemas/shopping-cart.schema');

const router = express.Router();
const service = new ShoppingCartService();

//Shopping Cart
router.get('/', async (req, res) => {
  const shoppingCart = await service.find();
  res.json(shoppingCart);
});

router.get(
  '/:shoppingCartId',
  validatorHandler(getShoppingCartSchema, 'params'),
  async (req, res, next) => {
    try {
      const { shoppingCartId } = req.params;
      const shoppingCart= await service.findOne(shoppingCartId);
      res.status(200).json(shoppingCart);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createShoppingCartSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newShoppingCart = await service.create(body);
    res.status(201).json(newShoppingCart);
  },
);


router.patch(
  '/:shoppingCartId',
  validatorHandler(getShoppingCartSchema, 'params'),
  validatorHandler(updateShoppingCartSchema, 'body'),
  async (req, res, next) => {
    try {
      const { shoppingCartId } = req.params;
      const body = req.body;
      const shoppingCart = await service.update(shoppingCartId, body);
      res.status(200).json(shoppingCart);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:shoppingCartId', async (req, res) => {
  const { shoppingCartId } = req.params;
  const result = await service.delete(shoppingCartId);
  res.status(200).json(result);
});

module.exports = router;

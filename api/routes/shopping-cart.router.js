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
router.get('/', validatorHandler(getShoppingCartSchema, 'params'),async (req, res) => {
  const shoppingCart = await service.find();
  res.json(shoppingCart);
});

router.post(
  '/',
  validatorHandler(createShoppingCartSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  },
);

router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;
  const result = await service.delete(productId);
  res.status(200).json(result);
});

module.exports = router;

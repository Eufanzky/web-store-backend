const express = require('express');

const ProductService = require('../services/products.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductService();

//Products
router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});
router.get('/filter', (req, res) => {
  res.status(200).send('Yo soy un filter');
});
router.get(
  '/:productId',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const product = await service.findOne(productId);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json(newProduct);
  },
);

router.patch(
  '/:productId',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const { productId } = req.params;
      const body = req.body;
      const product = await service.update(productId, body);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  },
);

router.delete('/:productId', async (req, res) => {
  const { productId } = req.params;
  const result = await service.delete(productId);
  res.status(200).json(result);
});

module.exports = router;

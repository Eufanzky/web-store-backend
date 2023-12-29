const express = require('express');

const OrdersService = require('../services/orders.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
} = require('../schemas/orders.schema');

const router = express.Router();
const service = new OrdersService();

//Orders
router.get('/', async (req, res) => {
  const Orders = await service.find();
  res.status(200).json(Orders);
});

router.get(
  '/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const order = await service.findOne(id);
      res.json(order);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  },
);

router.patch(
  '/:OrderId',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res) => {
    const { OrderId } = req.params;
    const body = req.body;
    const Order = await service.update(OrderId, body);
    res.status(200).json(Order);
  },
);

router.delete('/:OrderId', async (req, res) => {
  const { OrderId } = req.params;
  const result = await service.delete(OrderId);
  res.status(200).json(result);
});

module.exports = router;

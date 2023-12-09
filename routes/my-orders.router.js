const express = require('express');

const MyOrdersService = require('../services/my-orders.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createMyOrderSchema,
  updateMyOrderSchema,
  getMyOrderSchema,
} = require('../schemas/my-orders.schema');

const router = express.Router();
const service = new MyOrdersService();

//My orders
router.get(
  '/',
  validatorHandler(getMyOrderSchema, 'params'),
  async (req, res) => {
    const myOrders = await service.find();
    res.status(200).json(myOrders);
  },
);
router.get('/:orderId', async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await service.findOne(orderId);
    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createMyOrderSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newOrder = await service.create(body);
    res.status(201).json(newOrder);
  },
);

router.patch(
  '/:myOrderId',
  validatorHandler(getMyOrderSchema, 'params'),
  validatorHandler(updateMyOrderSchema, 'body'),
  async (req, res) => {
    const { myOrderId } = req.params;
    const body = req.body;
    const myOrder = await service.update(myOrderId, body);
    res.status(200).json(myOrder);
  },
);

router.delete('/:myOrderId', async (req, res) => {
  const { myOrderId } = req.params;
  const result = await service.delete(myOrderId);
  res.status(200).json(result);
});

module.exports = router;

const express = require('express');
const passport = require('passport');

const OrdersService = require('../services/orders.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  updateOrderSchema,
  getOrderSchema,
  addItemSchema,
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
  },
);

router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = {
        userId: req.user.sub
      }
      const newOrder = await service.create(body);
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  },
);

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res) => {
    try {
      const body = req.body;
      const newItem = await service.addItem(body);
      res.status(201).json(newItem);
    } catch (error) {
      next(error);
    }
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

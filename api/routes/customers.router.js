const express = require('express');
const CustomersService = require('../services/customers.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} = require('../schemas/customer.schema');

const router = express.Router();
const service = new CustomersService();

router.get('/', async (req, res) => {
  const customers = await service.find();
  res.status(200).json(customers);
});
router.get(
  '/:customerId',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const customer = await service.findOne(customerId);
      res.status(200).json(customer);
    } catch (error) {
      next(error);
    }
  },
);
router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newCustomer = await service.create(body);
    res.status(201).json(newCustomer);
  },
);

router.patch(
  '/:customerId',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res) => {
    const { customerId } = req.params;
    const body = req.body;
    const customer = await service.update(customerId, body);
    res.status(200).json(customer);
  },
);

router.delete('/:customerId', async (req, res) => {
  const { customerId } = req.params;
  const result = await service.delete(customerId);
  res.status(200).json(result);
});

module.exports = router;

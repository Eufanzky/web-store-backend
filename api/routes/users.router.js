const express = require('express');

const UsersService = require('../services/users.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
} = require('../schemas/users.schema');

const router = express.Router();
const service = new UsersService();

router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users)
  } catch (error) {
    next(error)
  }
});
router.get('/:userId', validatorHandler(getUserSchema, 'params'), async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await service.findOne(userId);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
});

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body;
    const newUser = await service.create(body);
    res.status(201).json(newUser);
  },
);

router.patch(
  '/:userId',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    const { userId } = req.params;
    const body = req.body;
    const user = await service.update(userId, body);
    res.status(200).json(user);
  },
);

router.delete('/userId', async (req, res) => {
  const { userId } = req.params;
  const result = await service.delete(userId);
  res.status(200).json(result);
});

module.exports = router;

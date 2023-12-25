const express = require('express');
const productsRouter = require('./products.router');
const categoriesRouter = require('./categories.router');
const usersRouter = require('./users.router');
const myOrdersRouter = require('./my-orders.router');
const shoppingCartRouter = require('./shopping-cart.router');
const customersRouter = require('./customers.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productsRouter);
  router.use('/categories', categoriesRouter);
  router.use('/users', usersRouter);
  router.use('/my-orders', myOrdersRouter);
  router.use('/shopping-cart', shoppingCartRouter);
  router.use('/customers', customersRouter);
}

module.exports = routerApi;

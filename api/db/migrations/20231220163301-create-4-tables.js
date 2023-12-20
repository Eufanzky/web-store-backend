'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model');
const { CategorySchema, CATEGORY_TABLE } = require('../models/category.model');
const { MyOrderSchema, MY_ORDER_TABLE } = require('../models/my-order.model');
const {
  ShoppingCartSchema,
  SHOPPING_CART_TABLE,
} = require('../models/shopping-cart.model');

module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(MY_ORDER_TABLE, MyOrderSchema);
    await queryInterface.createTable(SHOPPING_CART_TABLE, ShoppingCartSchema);
  },

  async down(queryInterface) {
    await queryInterface.drop(PRODUCT_TABLE);
    await queryInterface.drop(CATEGORY_TABLE);
    await queryInterface.drop(MY_ORDER_TABLE);
    await queryInterface.drop(SHOPPING_CART_TABLE);
  },
};

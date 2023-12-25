'use strict';

/** @type {import('sequelize-cli').Migration} */

const { ProductSchema, PRODUCT_TABLE } = require('../models/product.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'description', ProductSchema.description);
    await queryInterface.addColumn(PRODUCT_TABLE, 'created_at', ProductSchema.createdAt);
    await queryInterface.addColumn(PRODUCT_TABLE, 'category_id', ProductSchema.categoryId);
  },

  async down (queryInterface) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'description');
    await queryInterface.removeColumn(PRODUCT_TABLE, 'created_at');
    await queryInterface.removeColumn(PRODUCT_TABLE, 'category_id');
  }
};

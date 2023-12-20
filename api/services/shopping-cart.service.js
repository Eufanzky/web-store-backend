const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class ShoppingCartService {
  constructor() {
  }
  generate() {
  }
  async create(data) {
    const newShoppingCart = await models.ShoppingCart.create(data);
    return newShoppingCart;
  }
  async find() {
    const rta = await models.ShoppingCart.findAll();
    return rta;
  }
  async findOne(id) {
    const shoppingCart = await models.ShoppingCart.findByPk(id);
    if (!shoppingCart) {
      throw boom.notFound('order not found');
    }
    return shoppingCart;
  }
  async update(id, changes) {
    const shoppingCart = await this.findOne(id);
    const rta = await shoppingCart.update(changes);
    return rta;
  }
  async delete(id) {
    const shoppingCart = await this.findOne(id);
    await shoppingCart.destroy();
    return { id };
  }
}

module.exports = ShoppingCartService;

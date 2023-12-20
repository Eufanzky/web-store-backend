const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class MyOrdersService {
  constructor() {}

  async create(data) {
    const newMyOrder = await models.MyOrder.create(data);
    return newMyOrder;
  }
  async find() {
    const rta = await models.MyOrder.findAll();
    return rta;
  }
  async findOne(id) {
    const myOrder = await models.MyOrder.findByPk(id);
    if (!myOrder) {
      throw boom.notFound('order not found');
    }
    return myOrder;
  }
  async update(id, changes) {
    const myOrder = await this.findOne(id);
    const rta = await myOrder.update(changes);
    return rta;
  }
  async delete(id) {
    const myOrder = await this.findOne(id);
    await myOrder.destroy();
    return { id };
  }
}

module.exports = MyOrdersService;

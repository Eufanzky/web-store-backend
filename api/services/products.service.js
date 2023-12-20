const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }
  async find() {
    const rta = await models.Product.findAll();
    return rta;
  }
  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('product is Blocked');
    }
    return product;
  }
  async update(id, changes) {
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }
  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductService;

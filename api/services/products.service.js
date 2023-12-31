const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }
  async find(query) {
    const options = {
      include: ['category'],
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }
    const rta = await models.Product.findAll(options);
    return rta;
  }
  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('product is blocked');
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

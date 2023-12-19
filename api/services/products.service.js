const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const sequelize = require('../libs/sequelize');
const { models } = require('../libs/sequelize');

class ProductService {
  constructor() {
    // this.products = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }
  // generate() {
  //   const limit = 100;
  //   for (let index = 0; index < limit; index++) {
  //     this.products.push({
  //       productId: faker.string.uuid(),
  //       name: faker.commerce.productName(),
  //       price: parseInt(faker.commerce.price(), 10),
  //       image: faker.image.url(),
  //       isBlocked: faker.datatype.boolean(),
  //     });
  //   }
  // }
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
      throw boom.notFound('user not found');
    }
    if (product.isBlocked) {
      throw boom.conflict('Product is Blocked');
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

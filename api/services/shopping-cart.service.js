const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');

class ShoppingCartService {
  constructor() {
    this.shoppingCart = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }
  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.shoppingCart.push({
        productId: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
      });
    }
  }
  async create() {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    };
    this.shoppingCart.push(newProduct);
    return newProduct;
  }
  async find() {
    const rta = await models.ShoppingCart.findAll();
    return rta;
  }
  async delete() {
    const index = this.shoppingCart.findIndex((item) => item.productId === id);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }
    this.shoppingCart.splice(index, 1);
    return { id };
  }
}

module.exports = ShoppingCartService;

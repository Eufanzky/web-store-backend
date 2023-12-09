const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

class ShoppingCartService {
  constructor() {
    this.shoppingCart = [];
    this.generate();
  }
  generate() {
    const limit = 5;
    for (let index = 0; index < limit; index++) {
      this.shoppingCart.push({
        productId: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
  }
  async create() {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.shoppingCart.push(newProduct);
    return newProduct;
  }
  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.shoppingCart);
      }, 5000);
    });
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

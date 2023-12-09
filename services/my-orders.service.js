const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class MyOrdersService {
  constructor() {
    this.myOrders = [];
    this.generate();
  }
  generate() {
    const limit = 10;

    const productsArray = [];
    for (let j = 0; j < getRandomInt(10); j++) {
      productsArray.push({
        productId: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
      });
    }
    for (let index = 0; index < limit; index++) {
      this.myOrders.push({
        orderId: faker.database.mongodbObjectId(),
        name: faker.person.fullName(),
        productsArray,
      });
    }
  }
  async create(data) {
    const newOrder = {
      orderId: faker.database.mongodbObjectId(),
      ...data,
    };
    this.myOrders.push(newOrder);
    return newOrder;
  }
  find() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.myOrders);
      }, 5000);
    });
  }
  async findOne(id) {
    const myOrder = this.myOrders.find((item) => item.orderId === id);
    if (!myOrder) {
      throw boom.notFound('Order not found');
    }
    return myOrder;
  }
  async update(id, changes) {
    const index = this.myOrders.findIndex((item) => item.orderId === id);
    if (index === -1) {
      throw boom.notFound('Order not found');
    }
    const myOrder = this.myOrders[index];
    this.myOrders[index] = {
      ...myOrder,
      ...changes,
    };
    return this.myOrders[index];
  }
  async delete(id) {
    const index = this.myOrders.findIndex((item) => item.orderId === id);
    if (index === -1) {
      throw boom.notFound('Order not found');
    }
    this.myOrders.splice(index, 1);
    return { id };
  }
}

module.exports = MyOrdersService;

const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');


class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }
  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.categories.push({
        categoryId: faker.database.mongodbObjectId(),
        name: faker.commerce.productAdjective(),
      });
    }
  }
  async create(data) {
    const newCategory = {
      categoryId: faker.database.mongodbObjectId(),
      ...data,
    };
    this.categories.push(newCategory);
    return newCategory;
  }
  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }
  async findOne(id) {
    const category = this.categories.find((item) => item.categoryId === id);
    if (!category) {
      throw boom.notFound('Category not found');
    }
    return category;
  }
  async update(id, changes) {
    const index = this.categories.findIndex((item) => item.categoryId === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    const categories = this.categories[index];
    this.categories[index] = {
      ...categories,
      ...changes,
    };
    return this.categories[index];
  }
  async delete(id) {
    const index = this.categories.findIndex((item) => item.categoryId === id);
    if (index === -1) {
      throw boom.notFound('Category not found');
    }
    this.categories.splice(index, 1);
    return { id };
  }
}

module.exports = CategoriesService;

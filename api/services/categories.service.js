const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');
const pool = require('../libs/postgres.pool');
const { models } = require('../libs/sequelize');


class CategoriesService {
  constructor() {
    // this.categories = [];
    // this.generate();
    // this.pool = pool;
    // this.pool.on('error', (err) => console.error(err));
  }
  generate() {
    // const limit = 100;
    // for (let index = 0; index < limit; index++) {
    //   this.categories.push({
    //     categoryId: faker.database.mongodbObjectId(),
    //     name: faker.commerce.productAdjective(),
    //   });
    // }
  }

  async create(data) {
    const newCategory = await models.Category.create(data);
    return newCategory;
  }

  async find() {
    const rta = await models.Category.findAll();
    return rta;
  }

  async findOne(id) {
    const category = await models.Category.findByPk(id);
    if (!category) {
      throw boom.notFound('user not found');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

module.exports = CategoriesService;

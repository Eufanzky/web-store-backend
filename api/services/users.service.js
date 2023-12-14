const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const getConnection = require('../libs/postgres')



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    for (let index = 0; index < 10; index++) {
      this.users.push({
        userId: faker.database.mongodbObjectId(),
        name: faker.person.fullName(),
        gender: faker.person.gender(),
        age: getRandomInt(100),
        email: faker.internet.email(),
        isBlocked: faker.datatype.boolean(),
      });
    }
  }
  async create(data) {
    const newUser = {
      userId: faker.database.mongodbObjectId(),
      ...data,
    };
    this.products.push(newUser);
    return newUser;
  }
  async find() {
    const client = await getConnection();
    const rta = await client.query('SELECT * FROM tasks');
    return rta.rows;

    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.users);
    //   }, 5000);
    // });
  }
  async findOne(id) {
    const user = this.users.find((item) => item.userId === id);
    if (!user) {
      throw boom.notFound('User Not Found');
    }
    if (user.isBlocked) {
      throw boom.conflict('User Is Blocked');
    }
    return user;
  }
  async update(id, changes) {
    const index = this.users.findIndex((item) => item.userId === id);
    if (index === -1) {
      throw boom.notFound('User Not Found');
    }
    const user = this.users[index];
    this.users[index] = {
      ...user,
      ...changes,
    };
    return this.users[index];
  }
  async delete(id) {
    const index = this.users.findIndex((item) => item.userId === id);
    if (index === -1) {
      throw boom.notFound('User Not Found');
    }
    this.users.splice(index, 1);
    return { id };
  }
}

module.exports = UsersService;

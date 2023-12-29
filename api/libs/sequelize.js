const { Sequelize } = require('sequelize');
const { config } = require('../config/config');
const setUpModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: true,
});

setUpModels(sequelize);
sequelize.sync()
  .then(() => {
    console.log('Database and tables have been synced!');
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });

module.exports = sequelize;

const { Model, DataTypes, Sequelize } = require('sequelize');
const MY_ORDER_TABLE = 'my_orders';
const MyOrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  price: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  image: {
    allowNull: true,
    type: DataTypes.STRING,
  },
};

class MyOrder extends Model {
  static associate() {
    //TODO
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: MY_ORDER_TABLE,
      modelName: 'MyOrder',
      timestamps: false,
    };
  }
}

module.exports = { MY_ORDER_TABLE, MyOrderSchema, MyOrder };

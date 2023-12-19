const { Model, DataTypes, Sequelize } = require('sequelize');
const SHOPPING_CART_TABLE = 'shopping_carts';
const ShoppingCartSchema = {
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

class ShoppingCart extends Model {
  static associate() {
    //TODO
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: SHOPPING_CART_TABLE,
      modelName: 'ShoppingCart',
      timestamps: false,
    };
  }
}

module.exports = { SHOPPING_CART_TABLE, ShoppingCartSchema, ShoppingCart };

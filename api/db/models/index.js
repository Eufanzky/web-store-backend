const { User, UserSchema } = require('./user.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { MyOrder, MyOrderSchema } = require('./my-order.model');
const { ShoppingCart, ShoppingCartSchema } = require('./shopping-cart.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  MyOrder.init(MyOrderSchema, MyOrder.config(sequelize));
  ShoppingCart.init(ShoppingCartSchema, ShoppingCart.config(sequelize));
}

module.exports = setUpModels;

const { User, UserSchema } = require('./user.model');
const { Customer, CustomerSchema } = require('./customer.model');
const { Category, CategorySchema } = require('./category.model');
const { Product, ProductSchema } = require('./product.model');
const { MyOrder, MyOrderSchema } = require('./my-order.model');
const { ShoppingCart, ShoppingCartSchema } = require('./shopping-cart.model');

function setUpModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  MyOrder.init(MyOrderSchema, MyOrder.config(sequelize));
  ShoppingCart.init(ShoppingCartSchema, ShoppingCart.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);

  Category.associate(sequelize.models);
  Product.associate(sequelize.models);


}

module.exports = setUpModels;

"use strict";
const { Model,Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    size: {
      type: DataTypes.STRING
    },
    price: {
      type: DataTypes.FLOAT
    },
    type: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

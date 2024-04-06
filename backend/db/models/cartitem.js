"use strict";
const { Model,Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CartItem.init({
    cart_id: {
    type:  DataTypes.INTEGER,
    },
      item_id: {
    type:  DataTypes.INTEGER,

    },
      size: {
    type:  DataTypes.STRING,

    },
      price: {
    type:  DataTypes.FLOAT,

    },
      quantity: {
  type:  DataTypes.INTEGER
  },
  },
   {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};

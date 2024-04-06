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
      CartItem.belongsTo(
        models.Cart,{
          foreignKey: 'cart_id',
          constraints: false
        }
      )
    }
  }
  CartItem.init({
    cart_id: {
    type:  DataTypes.INTEGER,
        allowNull: false,
    },
      item_id: {
    type:  DataTypes.INTEGER,
        allowNull: false,

    },
      size: {
    type:  DataTypes.STRING,
        allowNull: false,

    },
      price: {
    type:  DataTypes.FLOAT,
        allowNull: false,

    },
      quantity: {
  type:  DataTypes.INTEGER,
        allowNull: false,
  },
  },
   {
    sequelize,
    modelName: 'CartItem',
  });
  return CartItem;
};

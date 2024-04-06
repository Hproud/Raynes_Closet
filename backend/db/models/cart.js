"use strict";
const { Model,Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cart.init({
    user_id: {
      type: DataTypes.INTEGER
    },
    subtotal: {
      type: DataTypes.FLOAT
    },
    total: {
      type: DataTypes.FLOAT
    },
    purchased: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};

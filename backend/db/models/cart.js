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
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    subtotal: {
      type: DataTypes.FLOAT,
        allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
        allowNull: false,
    },
    purchased: {
      type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue:false
    }
  }, {
    sequelize,
    modelName: 'Cart',
  });
  return Cart;
};
"use strict";
const { Model,Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Order.init({
    user_id: {
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    cart_id: {
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    total: {
      type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0.00
    },
    status: {
      type: DataTypes.STRING,
        allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
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
      type: DataTypes.INTEGER
    },
    cart_id: {
      type: DataTypes.INTEGER
    },
    total: {
      type: DataTypes.FLOAT
    },
    status: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};

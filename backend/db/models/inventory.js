"use strict";
const { Model,Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Inventory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Inventory.init({
    item_id: {
      type: DataTypes.INTEGER
    },
    quantity: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};

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
      Inventory.belongsTo(
        models.Product,{
          foreignKey: 'item_id',
        }
      )


    }
  }
  Inventory.init({
    item_id: {
      type: DataTypes.INTEGER,
        allowNull: false,

    },
    quantity: {
      type: DataTypes.INTEGER,
        allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Inventory',
  });
  return Inventory;
};

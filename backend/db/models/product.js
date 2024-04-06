"use strict";
const { Model,Validator } = require("sequelize");
const inventory = require("./inventory");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Product.hasMany(
        models.CartItem,{
          foreignKey: 'item_id',
          onDelete:'CASCADE',
          hooks:true
        }
      )

        Product.belongsTo(
          models.inventory,{
            foreignKey: 'item_id',
            
          }
        )


    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
      type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
        allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
        allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

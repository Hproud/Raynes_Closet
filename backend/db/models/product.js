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

      Product.hasMany(
        models.CartItem,{
          foreignKey: 'item_id',
          // onDelete:'CASCADE',
          // hooks:true
        }
      )

        Product.hasOne(
          models.Inventory,{
            foreignKey: 'item_id',
            onDelete:'CASCADE',
            hooks: true
            //! added the ondelete after last deployment
          }
        )

          Product.hasMany(models.Review,{
            foreignKey: 'item_id',
            onDelete: 'CASCADE',
            hooks: true
          })

          Product.hasMany(
            models.Image,
            {
              foreignKey: 'imageable_id',
              // as: 'ProductImages',
              constraints:false,
              onDelete:'CASCADE',
              hooks:true,
              scope:{
                imageable_type: 'Product'
              }
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

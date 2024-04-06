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
    Cart.hasMany(
      models.CartItem,{
        foreignKey: 'cart_id',
        constraints:false,
        onDelete: 'CASCADE',
        hooks:true,
      }
    )

      Cart.belongsTo(
        models.User,{
          foreignKey: 'user_id'
        }
      )

        Cart.belongsTo(models.Order,{
          foreignKey: 'cart_id'
        })



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

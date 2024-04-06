"use strict";
const { Model,Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Review.belongsTo(models.User,{
        foreignKey:'user_id'
      })

      Review.belongsTo(models.Product,{
        foreignKey: 'item_id'
      })

      Review.hasMany(
        models.Image,
        {
          foreignKey: 'imageableId',
          as: 'ReviewImages',
          constraints:false,
          onDelete:'CASCADE',
          hooks:true,
          scope:{
            imageableType: 'Review'
          }
        }
      )



    }
  }
  Review.init({
    user_id: {
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    review: {
      type: DataTypes.STRING,
        allowNull: false,
    },
    stars: {
      type: DataTypes.FLOAT,
        defaultValue: 0.0
    },
    item_id: {
      type: DataTypes.INTEGER,
        allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};

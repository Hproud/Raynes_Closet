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
      // define association here
    }
  }
  Review.init({
    user_id: {
      type: DataTypes.INTEGER
    },
    review: {
      type: DataTypes.STRING
    },
    stars: {
      type: DataTypes.FLOAT
    },
    item_id: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};

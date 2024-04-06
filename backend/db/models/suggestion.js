"use strict";
const { Model,Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Suggestion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Suggestion.init({
    user_id: {
      type: DataTypes.INTEGER
    },
    suggestion: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Suggestion',
  });
  return Suggestion;
};

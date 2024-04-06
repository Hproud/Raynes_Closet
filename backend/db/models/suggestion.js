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

      Suggestion.belongsTo(models.User,{
        foreignKey: 'user_id'
      })

    }
  }
  Suggestion.init({
    user_id: {
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    suggestion: {
      type: DataTypes.STRING,
        allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'Suggestion',
  });
  return Suggestion;
};

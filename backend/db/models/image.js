"use strict";
const { Model,Validator } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      Image.belongsTo(
        models.Product,{
          foreignKey: 'imageableId',
          constraints:false,
        }
      )

      Image.belongsTo(
        models.Review,{
          foreignKey: 'imageableId',
          as: 'ReviewImages',
          constraints:false,
        }
      )


    }
  }
  Image.init({
    imageable_id: {
      type: DataTypes.INTEGER,
        allowNull: false,
    },
    imageable_type: {
      type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
        allowNull: false,
    },
    preview: {
      type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'Image',
    defaultScope:{
      attributes:{
        include:['id','url'],
        exclude: ['imageableId','imageableType','createdAt','updatedAt','preview']
      }
    },
  });
  return Image;
};

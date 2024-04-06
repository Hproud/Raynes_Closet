'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
  };
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'User',
          key: 'id',
          onDelete: 'CASCADE',
          hooks: true
        }
      },
      review: {
        type: Sequelize.STRING,
        allowNull: false,

      },
      stars: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Product',
          key: 'id',
          onDelete: 'CASCADE',
          hooks: true
        }
            },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },options);
  },
  async down(queryInterface, Sequelize) {
    options.tableName = "Reviews"
    await queryInterface.dropTable(options);
  }
};

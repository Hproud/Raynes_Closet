'use strict';
/** @type {import('sequelize-cli').Migration} */
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
  };
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CartItems', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

      },
      size: {
        type: Sequelize.STRING,
        allowNull: false,
            },
      price: {
        type: Sequelize.FLOAT,
        defaultValue: 0.0
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,

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
    options.tableName = "CartItems"
    await queryInterface.dropTable(options);
  }
};

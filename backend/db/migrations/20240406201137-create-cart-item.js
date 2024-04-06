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
        // references:{
        //   model: 'Carts',
        //   key: 'id',
        //   onDelete: 'CASCADE',
        //   hooks: true
        // }

      },
      item_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model: 'Products',
          key: 'id',
          onDelete: 'CASCADE',
          hooks: true
        }

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
        defaultValue: 1

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

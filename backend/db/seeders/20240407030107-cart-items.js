'use strict';
const {CartItem, sequelize} = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
try{

await CartItem.bulkCreate([
  {
    cart_id: 8,
    item_id: 1,
    size: 'M',
    price: 10.00,
    quantity: 2
  },
  {
    cart_id: 8,
    item_id: 2,
    size: 'S',
    price: 12.00,
    quantity: 1
  },
  {
    cart_id: 8,
    item_id: 7,
    size: 'M',
    price: 14.00,
    quantity: 1
  },{
    cart_id: 1,
    item_id: 1,
    size: 'XS',
    price: 10.00,
    quantity: 2
  },
  {
    cart_id: 1,
    item_id: 2,
    size: 'L',
    price: 12.00,
    quantity: 1
  },
  {
    cart_id: 2,
    item_id: 7,
    size: 'M',
    price: 14.00,
    quantity: 1
  },{
    cart_id: 3,
    item_id: 1,
    size: 'M',
    price: 10.00,
    quantity: 2
  },
  {
    cart_id: 4,
    item_id: 2,
    size: 'S',
    price: 12.00,
    quantity: 1
  },
  {
    cart_id: 5,
    item_id: 7,
    size: 'M',
    price: 14.00,
    quantity: 1
  },{
    cart_id: 6,
    item_id: 1,
    size: 'M',
    price: 10.00,
    quantity: 2
  },
  {
    cart_id: 7,
    item_id: 2,
    size: 'S',
    price: 12.00,
    quantity: 1
  },
  {
    cart_id: 8,
    item_id: 7,
    size: 'M',
    price: 14.00,
    quantity: 1
  },


],{validate:true})

}catch(err){console.log('this is my error', err)}
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'CartItems';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options,{
      cart_id: 8
    },{})

  }
};

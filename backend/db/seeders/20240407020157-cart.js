'use strict';
const {Cart, sequelize} = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
try{

await Cart.bulkCreate([
{
  user_id: 1,
  subtotal: 8.25,
  total: 10.23,
  purchased: true
   },
{
  user_id: 2,
  subtotal: 12.00,
  total: 14.44,
  purchased: true
},
   {
  user_id: 3,
  subtotal: 4.99,
  total: 5.24,
  purchased: true

},
{
  user_id: 4,
  subtotal: 8.56,
  total: 9.40,
  purchased: true

},
{
  user_id: 5,
  subtotal: 22.00,
  total: 23.70,
  purchased: true

},
{
  user_id: 6,
  subtotal: 44.00,
  total: 48.20,
  purchased: true

},
{
  user_id: 7,
  subtotal: 9.00,
  total: 12.10,
  purchased: true
   },
{
  user_id: 1,
  subtotal: 36.00,
  total: 39.24,
  purchased: false

},

],{validate:true})

}catch(err){console.log('this is my error', err)}
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Carts';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options,{
      user_id: { [Op.in] : [1,2,3,4,5,6,7] }
    },{})

  }
};

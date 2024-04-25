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
  subtotal: 22.00,
  total: 23.98,
  purchased: true
   },
{
  user_id: 2,
  subtotal: 14.00,
  total: 15.26,
  purchased: true
},
   {
  user_id: 3,
  subtotal: 10.00,
  total: 10.09,
  purchased: true

},
{
  user_id: 4,
  subtotal: 12.00,
  total: 13.08,
  purchased: true

},
{
  user_id: 5,
  subtotal: 14.00,
  total: 15.26,
  purchased: true

},
{
  user_id: 6,
  subtotal: 10.00,
  total: 10.09,
  purchased: true

},
{
  user_id: 7,
  subtotal: 12.00,
  total: 13.08,
  purchased: true
   },
{
  user_id: 2,
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

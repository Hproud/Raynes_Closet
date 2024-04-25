'use strict';
const {Order, sequelize} = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
try{

await Order.bulkCreate([
{
  user_id: 1,
  cart_id: 1,
  total: 23.98,
  status: 'Fufilled'
   },
{
  user_id: 2,
  cart_id: 2,
  total: 15.26,
  status: 'Pending'
},
   {
  user_id: 3,
  cart_id: 3,
  total: 10.09,
  status: 'Fufilled'

},
{
  user_id: 4,
  cart_id: 4,
  total: 13.08,
  status: 'Refunded'

},
{
  user_id: 5,
  cart_id: 5,
  total: 15.26,
  status: 'Canceled'

},
{
  user_id: 6,
  cart_id: 6,
  total: 10.09,
  status: 'Fufilled'

},
{
  user_id: 7,
  cart_id: 7,
  total: 13.08,
  status: 'Fufilled'
   },


],{validate:true})

}catch(err){console.log('this is my error', err)}
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Orders';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options,{
      user_id: { [Op.in] : [1,2,3,4,5,6,7] }
    },{})

  }
};

'use strict';
const {Inventory, sequelize} = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
try{

await Inventory.bulkCreate([
{
  item_id: 1,
 quantity: 8
   },
{
  item_id: 2,
  quantity: 5
},
   {
  item_id: 3,
  quantity: 13

},
{
  item_id: 4,
  quantity: 2

},
{
  item_id: 5,
  quantity: 16

},
{
  item_id: 6,
  quantity: 7

},
{
  item_id: 7,
  quantity: 13
   },


],{validate:true})

}catch(err){console.log('this is my error', err)}
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Inventory';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options,{
      item_id: { [Op.in] : [1,2,3,4,5,6,7] }
    },{})

  }
};

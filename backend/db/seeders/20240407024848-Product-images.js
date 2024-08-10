'use strict';
const {Image, sequelize} = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
try{

await Image.bulkCreate([
{
  imageable_id: 1,
  imageable_type: 'Product',
  url: 'https://m.media-amazon.com/images/I/61Edt3hX1LL.jpg',
  preview: true
},
{
  imageable_id: 2,
  imageable_type: 'Product',
  url: 'https://m.media-amazon.com/images/I/71h8IiUjjNL._AC_UY1000_.jpg',
  preview: true
},
{
  imageable_id: 3,
  imageable_type: 'Product',
  url: 'https://m.media-amazon.com/images/I/61PYVH9979L._AC_UY1000_.jpg',
  preview: true
},
{
  imageable_id: 4,
  imageable_type: 'Product',
  url: 'https://coastalcottonclothing.com/cdn/shop/products/hoodieazulblue_2524x.jpg?v=1669052950',
  preview: true
},
{
  imageable_id: 5,
  imageable_type: 'Product',
  url: 'https://www.titlenine.com/dw/image/v2/BDTP_PRD/on/demandware.static/-/Sites-titlenine_master_catalog/default/dwd8475af6/images/src/421314/421314_03.jpg?sw=750&sh=750&sm=fit',
  preview: true
},
{
  imageable_id: 6,
  imageable_type: 'Product',
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRScYoADbaYyA0PAC1QUuLPI75E7E2dGWWqxqeDpgj1zA&s',
  preview: true
},
{
  imageable_id: 7,
  imageable_type: 'Product',
  url: 'https://i.etsystatic.com/39794601/r/il/e170de/4605674140/il_fullxfull.4605674140_g3b6.jpg',
  preview: true
}




],{validate:true})

}catch(err){console.log('this is my error', err)}
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Images';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options,{
      imageable_type: "Product"
    },{})

  }
};

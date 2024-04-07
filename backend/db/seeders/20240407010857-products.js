'use strict';
const {Product, sequelize} = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
try{

await Product.bulkCreate([
{
  name: 'Crazy Cow',
  description: 'A shirt for those who love crazy cow merch!',
  size: 'M',
  price: 5.00,
  type: 't-shirt'
},
{
  name: 'Digital illusions',
  description: 'This is a great gift for any Techy friend or family!',
  size: 'L',
  price: 12.00,
  type: 't-shirt'
},
{
  name: 'Missing Peices',
  description: 'This is a perfect gift for couples!',
  size: 'L',
  price: 22.00,
  type: 'hoodie'
},
{
  name: 'Light Cotton Hoodie',
  description: 'This hoodie is made with a thin breathable material. This would be Great for spring or fall!',
  size: 'XXL',
  price: 15.00,
  type: 'hoodie'
},
{
  name: 'Form Fitting Racerback Tank',
  description: 'This tank top is light weight and form fitting',
  size: 'S',
  price: 4.00,
  type: 'tank-top'
},
{
  name: 'Thrown to wolves',
  description: 'This cotton t-shirt is loose fitting and a great idea for anyone who needs a little motivation in their lives.',
  size: 'XL',
  price: 8.00,
  type: 't-shirt'
},
{
  name: 'Bite Me',
  description: 'This hoodie is a great gift idea for any sassy friend!',
  size: 'XS',
  price: 14.00,
  type: 'hoodie'
},
],{validate:true})

}catch(err){console.log('this is my error', err)}
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Products';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options,{
      size: { [Op.in] : ['M','L','XXL','S','XL','XS'] }
    },{})

  }
};

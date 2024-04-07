'use strict';
const {Review, sequelize} = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
try{

await Review.bulkCreate([
{
  user_id: 1,
  review: 'This was an ADORABLE shirt!!!!!',
  stars: 4.5,
  item_id: 1
},
{
  user_id: 3,
  review: 'This was scratchy and very unpleasant',
  stars: 2.0,
  item_id: 4
},
{
  user_id: 5,
  review: 'I love how comfortable this tank was! Its PERFECT for sports practices!!!!',
  stars: 5.0,
  item_id: 5
},
{
  user_id: 2,
  review: 'I got this for my wife, it fits PERFECTLY! I couldnt be happier! Definitely going to order again!',
  stars: 5.0,
  item_id: 7
},
{
  user_id: 6,
  review: 'I got this yesterday and tried it on and let me tell you! I love how soft it is and the colors are so vibrant!',
  stars: 3.5,
  item_id: 2
},
{
  user_id: 7,
  review: 'I was not please, this material was not as light as advertised and is cheaply made.',
  stars: 1.0,
  item_id: 4
},
{
  user_id: 4,
  review: 'I got these for my son and his wife and they just love it! it was super soft and looked just like the pictures!!!',
  stars: 4.5,
  item_id: 3
},
{
  user_id: 1,
  review: 'Was a pretty comfortable hoodie, I love the design. I cant wait to find out what they come out with next!',
  stars: 4.0,
  item_id: 7
},

],{validate:true})

}catch(err){console.log('this is my error', err)}
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options,{
      user_id: { [Op.in] : [1,2,3,4,5,6,7] }
    },{})

  }
};

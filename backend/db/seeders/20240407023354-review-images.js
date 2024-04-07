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
  imageable_type: 'Review',
  url: 'https://eletees.com/wp-content/uploads/2023/10/Cute-Baby-Highland-Cow-Print-V-Neck-Shirt.jpg',
  preview: true
},
{
  imageable_id: 6,
  imageable_type: 'Review',
  url: 'https://preview.redd.it/finally-replaced-the-old-frayed-cuffs-on-my-hoodie-and-i-v0-1lwssdtfbw4a1.jpg?width=640&crop=smart&auto=webp&s=3a6eb10948c208d0b975a44a631e52d22b1a63b0',
  preview: true
},
{
  imageable_id: 3,
  imageable_type: 'Review',
  url: 'https://www.bellacanvas.com/bella/product/hires/6008003681alt1_1.jpg',
  preview: true
},
{
  imageable_id: 5,
  imageable_type: 'Review',
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQW9zeQWs-yqzuL0h0GYcvViXh62tr-EzY_bW1Anxn90Ak4nXKSnCC87uvv3uXwmwY_tWI&usqp=CAU',
  preview: true
},
{
  imageable_id: 7,
  imageable_type: 'Review',
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8c9K3Q0oW7Q8iubRAZdO55vGsYZM2dE8fvLgBLJTPYw&s',
  preview: true
},
{
  imageable_id: 4,
  imageable_type: 'Review',
  url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQIxceb_uYVreMivIj_-aO5RaHcc9r27qHSi-__B34nw&s',
  preview: true
},
{
  imageable_id: 5,
  imageable_type: 'Review',
  url: 'https://www.kindredcoast.com/cdn/shop/files/KindredCoastRathrevor_17_2400x.jpg?v=1690155319',
  preview: false
}




],{validate:true})

}catch(err){console.log('this is my error', err)}
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Images';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options,{
      imageable_type: "Review"
    },{})

  }
};

'use strict';
const {Suggestion, sequelize} = require('../models');

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {
try{

await Suggestion.bulkCreate([
{
  user_id: 1,
  suggestion: 'I would like more cow stuff!'
},
{
  user_id: 2,
  suggestion: 'I want to see some Dinos!'
},
{
  user_id: 3,
  suggestion: 'I would like you to have more tank tops!'
},
{
  user_id: 4,
  suggestion: 'it would be awesome if you guys had Pajamas sets!'
},
{
  user_id: 5,
  suggestion: 'I want to see more car shirts'
},
{
  user_id: 6,
  suggestion: 'I wish you had more products geared towards kids'
},
{
  user_id: 7,
  suggestion: 'I want some hilarious items!'
},
{
  user_id: 2,
  suggestion: 'I would totally buy shirts or stuff that have funny puns!'
},

],{validate:true})

}catch(err){console.log('this is my error', err)}
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Suggestions';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options,{
      user_id: { [Op.in] : [1,2,3,4,5,6,7] }
    },{})

  }
};

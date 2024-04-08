'use strict';
const {User} = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await User.bulkCreate([
      {
        email: "master@email.com",
      username: "master_account",
      hashedPassword: bcrypt.hashSync('master'),
      firstName: 'Mishelle',
      lastName: 'Bryan',
      address: '12 Boss St.',
      city: "Big City",
      state: "Vermont",
      zipcode: '75364',
      master: true
    },

      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Jane',
        lastName: 'Doe',
        address: '123 Fake St',
        city: "new City",
        state: "Texas",
        zipcode: '98765'
      },
      {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'jake',
        lastName: 'smith',
        address: '234 another st',
        city: 'waynesville',
        state: 'Nebraska',
        zipcode: '45678'
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'jimmy',
        lastName: 'cool',
        address: '458 new St',
        city: 'San Antonio',
        state: 'Texas',
        zipcode:'77745'
      },
      {
        email: 'user3@user.io',
        username: 'FakeUser3',
        hashedPassword: bcrypt.hashSync('password4'),
        firstName: 'jason',
        lastName: 'smith',
        address: '658 awesome rd',
        city: 'Kent',
        state: 'Virginia',
        zipcode: '60258'
      },
      {
        email: 'user4@user.io',
        username: 'FakeUser4',
        hashedPassword: bcrypt.hashSync('password5'),
        firstName: 'jamie',
        lastName: 'lester',
        address: '99 pointed st',
        city: 'Rogerville',
        state: 'Ohio',
        zipcode: '15975'
      },
      {
        email: 'user5@user.io',
        username: 'FakeUser5',
        hashedPassword: bcrypt.hashSync('password6'),
        firstName: 'Stephanie',
        lastName: 'James',
        address: '2254 drive 500',
        city: 'Jasper',
        state: 'Missouri',
        zipcode: '65488'
      },
      {
        email: 'user6@user.io',
        username: 'FakeUser6',
        hashedPassword: bcrypt.hashSync('password7'),
        firstName: 'Jesse',
        lastName: 'James',
        address: '37652 pleasnt pkwy',
        city: 'Pleasantville',
        state: 'California',
        zipcode:'69691'
      }
    ],{validate: true });

  },

  async down (queryInterface, Sequelize) {
options.tableName = 'Users';
const Op = Sequelize.Op;
return queryInterface.bulkDelete(options, {
  username: { [Op.in]: ['Demo-lition','FakeUser1','FakeUser2']}
},{});
  }
};

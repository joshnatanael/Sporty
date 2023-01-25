'use strict';

const { hashPassword } = require('../helpers/bcrypt');
const data = require('../data/db.json');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', data.users.map(user=>{
      user.createdAt = user.updatedAt = new Date();
      user.password = hashPassword(user.password);
      return user;
    }));
    await queryInterface.bulkInsert('Categories', data.categories.map(category=>{
      category.createdAt = category.updatedAt = new Date();
      return category;
    }));
    await queryInterface.bulkInsert('Products', data.products.map(product=>{
      product.createdAt = product.updatedAt = new Date();
      product.slug = product.name.toLowerCase().split(" ").join("-");
      return product;
    }));
    await queryInterface.bulkInsert('Images', data.images.map(image=>{
      image.createdAt = image.updatedAt = new Date();
      return image;
    }));
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Images', null, {});
    await queryInterface.bulkDelete('Products', null, {});
    await queryInterface.bulkDelete('Categories', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};

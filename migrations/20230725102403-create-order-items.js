'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderItems', {
      orderItemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      ItemId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references:{
          model:'Items',
          key:'itemId',
        },
      },
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      state: {
        allowNull: false,
        type: Sequelize.ENUM('ORDERED', 'PENDING', 'COMPLETED', 'CANCELED'),
        defaultValue: 'ORDERED'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderItems');
  }
};
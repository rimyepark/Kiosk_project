'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemOrderCustomers', {
      orderICid: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ItemId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'Items',
          key:'itemId',
        },
      },
      OrderCustomerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references:{
          model:'OrderCustomers',
          key:'orderCustomerId',
        },
      },
      amount: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ItemOrderCustomers');
  }
};
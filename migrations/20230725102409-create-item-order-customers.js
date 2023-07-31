'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ItemOrderCustomers', {
      orderICId: {
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
      OrderCustomerId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references:{
          model:'OrderCustomers',
          key:'orderCustomerId',
        },
      },
      amount: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      option: {
        allowNull: false,
        type: Sequelize.JSON
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT
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
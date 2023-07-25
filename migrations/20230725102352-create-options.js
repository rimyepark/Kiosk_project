'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Options', {
      optionId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      extraPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      shotPrice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      hot: {
        allowNull: false,
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Options');
  }
};
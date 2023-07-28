'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Items', {
      itemId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      OptionId: {
        allowNull: false,
        type: Sequelize.BIGINT,
        references:{
          model:'Options',
          key:'optionId',
        },
        onDelete: 'CASCADE',
      },
      price: {
        allowNull: false,
        type: Sequelize.BIGINT
      },
      type: {
        allowNull: false,
        type: Sequelize.ENUM('Coffee', 'ade','Tea', 'Cake', 'Cookie') // "type" 컬럼으로 ENUM 타입을 사용합니다.
      },
      amount: {
        allowNull: false,
        defaultValue: 0,
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
    await queryInterface.dropTable('Items');
  }
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ItemOrderCustomers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.OrderCustomers, { //  1:1 관계 설정을 합니다.
        targetKey: 'orderCustomerId', 
        foreignKey: 'OrderCustomerId', 
      });
      this.belongsTo(models.Items, { //  1:1 관계 설정을 합니다.
        targetKey: 'itemId', 
        foreignKey: 'ItemId', 
      });
    }
  }
  ItemOrderCustomers.init({
    orderICid: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    ItemId: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references:{
        model:'Items',
        key:'itemId',
      },
    },
    OrderCustomerId: {
      allowNull: false,
      type: DataTypes.BIGINT,
      references:{
        model:'OrderCustomers',
        key:'orderCustomerId',
      },
    },
    amount: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    option: {
      allowNull: false,
      type: DataTypes.JSON
    },
    price: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    createdAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false, // NOT NULL
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  }, {
    sequelize,
    modelName: 'ItemOrderCustomers',
  });
  return ItemOrderCustomers;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
      this.belongsTo(models.Items, { //  1:N 관계 설정을 합니다.
        targetKey: 'itemId', 
        foreignKey: 'ItemId', 
      });
      
    }
  }

  const orderItemState = {
    "ORDERED": 0,
    "PENDING": 1,
    "COMPLETED": 2,
    "CANCELED": 3
  };  


  OrderItems.init({
    orderItemId: {
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
    amount: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    state: {
      allowNull: false,
      type: DataTypes.ENUM('ORDERED', 'PENDING', 'COMPLETED', 'CANCELED'),
      defaultValue: 'ORDERED',
      get() {
        const rawValue = this.getDataValue('state');
        return orderItemState[rawValue];
      },
      set(value) {
        const matchingKey = Object.keys(orderItemState).find((key) => orderItemState[key] === value);
        this.setDataValue('state', matchingKey);
      }

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
    modelName: 'OrderItems',
  });

 

  return OrderItems;
};
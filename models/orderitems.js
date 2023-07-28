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
      defaultValue: 0,
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
    modelName: 'OrderItems',
  });

 // state 값에 해당하는 문자열을 정의.
const states = {
  ORDERED: 0,
  PENDING: 1,
  COMPLETED: 2,
  CANCELED: 3
};

// state 값을 문자열로 변환하는 가상 필드를 추가.
Order.prototype.getState = function () {
  return Object.keys(states).find(key => states[key] === this.state);
};

// state 값을 숫자로 설정하는 가상 필드를 추가.
Order.prototype.setState = function (stateString) {
  this.state = states[stateString];
};

  return OrderItems;
};
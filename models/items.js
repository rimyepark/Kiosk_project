'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasOne(models.ItemOrderCustomers, { // 1:1 관계 설정을 합니다.
        sourceKey: 'itemId', 
        foreignKey: 'ItemId', 
      });
            
      this.belongsTo(models.Options, { //  1:N 관계 설정을 합니다.
              targetKey: 'optionId', 
              foreignKey: 'OptionId', 
            });
            
            this.hasMany(models.OrderItems, { // 1:N 관계 설정을 합니다.
              sourceKey: 'itemId', 
              foreignKey: 'ItemId', 
            });
    }
  }
  Items.init({
    itemId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    OptionId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references:{
        model:'Options',
        key:'optionId',
      },
      onDelete: 'CASCADE',
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    amount: {
      allowNull: false,
      type: DataTypes.INTEGER
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
    modelName: 'Items',
  });
  return Items;
};
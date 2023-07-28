'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Options extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
          
      this.hasMany(models.Items, { // 1:N 관계 설정을 합니다.
              sourceKey: 'optionId', 
              foreignKey: 'OptionId', 
            });
    }
  }
  Options.init({
    optionId: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.BIGINT
    },
    extraPrice: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    shotPrice: {
      allowNull: false,
      type: DataTypes.BIGINT
    },
    hot: {
      allowNull: false,
      type: DataTypes.BOOLEAN
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
    modelName: 'Options',
  });
  return Options;
};
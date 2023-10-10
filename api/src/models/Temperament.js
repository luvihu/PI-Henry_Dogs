const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Temperament', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
     
    },
    
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    }
  },
  { timestamps: false });
};
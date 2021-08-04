const { DataTypes } = require('sequelize');

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('article', {
    art_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },

    art_contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    art_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    art_date: {
      type: DataTypes.STRING

    },

    art_tags: {
      type: DataTypes.STRING,
    }, 
    
  }, {timestamps: false});
};
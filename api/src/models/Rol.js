const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('rol', {
    rol_id:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
      },
    rol_name: {
      type: DataTypes.STRING,
      
    },
  }, {timestamps: false});
};
const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "comment",
    {
      comment_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      comment_contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      comment_date: {
        type: DataTypes.STRING,
      },
      comment_views: {
        type: DataTypes.INTEGER,
      },
      comment_state: {
        type: DataTypes.BOOLEAN,
      },
      comment_likes: {
          type: DataTypes.INTEGER,
      }
    }
  );
};
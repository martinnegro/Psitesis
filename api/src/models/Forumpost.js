const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "forumpost",
    {
      post_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
      },
      post_contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      post_title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      post_date: {
        type: DataTypes.STRING,
      },
      post_views: {
        type: DataTypes.INTEGER,
      },
      post_state: {
        type: DataTypes.BOOLEAN,
      },
      post_likes: {
          type: DataTypes.INTEGER,
      }
    }
  );
};
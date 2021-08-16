const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("subcategory", {
    sub_cat_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    sub_cat_name:{
        type: DataTypes.STRING,
    },
    sub_cat_description:{
        type: DataTypes.STRING,
    }
  });
};

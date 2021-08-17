const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("subtopic", {
    sub_topic_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    sub_topic_name:{
        type: DataTypes.STRING,
    },
    sub_topic_description:{
        type: DataTypes.STRING,
    }
  });
};

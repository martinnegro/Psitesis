const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define("report", {
    rep_id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
    rep_reason:{
        type: DataTypes.STRING,
    },
    rep_state: {
        type: DataTypes.BOOLEAN
    }
})};
const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('category', {
            cat_id:{
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            cat_name:{
                type: DataTypes.STRING,
            }
    })}
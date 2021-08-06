const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('tag', {
            tag_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            tag_name: {
                type: DataTypes.STRING
            }
    })}
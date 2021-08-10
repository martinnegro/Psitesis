const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('tag', {
            tag_id: {
                type: DataTypes.UUID,
                allowNull: false,
                primaryKey: true,
            },
            tag_name: {
                type: DataTypes.STRING
            }
    })}
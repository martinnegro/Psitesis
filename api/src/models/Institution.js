const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('institution', {
        inst_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        inst_name: {
            type: DataTypes.STRING
        },
        inst_descriptions: {
            type: DataTypes.STRING,
        },
     

    })}
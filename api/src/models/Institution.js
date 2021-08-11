const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('institution', {
        inst_id: {
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },
        inst_name: {
            type: DataTypes.STRING
        },
        inst_descriptions: {
            type: DataTypes.STRING,
        },
        // Dos columnas nuevas para link al sitio y para link al logo
        inst_link: {
            type: DataTypes.STRING
        },
        inst_logo: {
            type: DataTypes.STRING
        }
    })}
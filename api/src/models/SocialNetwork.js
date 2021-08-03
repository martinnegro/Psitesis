const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('social_network', {
        soc_net_id:{
            type: DataTypes. INTEGER,
            allowNull: false,
            primaryKey : true,
        },

        soc_net_url:{
            type: DataTypes.STRING,
        }
    })
}
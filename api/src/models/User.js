const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('user', {
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },

        user_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        user_email:{
            type: DataTypes.STRING,
        },

        user_img_profile:{
            type: DataTypes.STRING
        },

        user_password:{
            type: DataTypes.STRING,
            allowNull: false,
        },

        institution_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        biography:{
            type: DataTypes.STRING
        },

        // soc_net_id:{
        //     type: DataTypes.STRING,
        //     allowNull: false,
        // }
    })
}
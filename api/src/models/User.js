const {DataTypes} = require('sequelize')

module.exports = (sequelize) => {
    sequelize.define ('user', {
        user_id:{
            type: DataTypes.UUID,
            allowNull: false,
            primaryKey: true,
        },

        user_id_A0: {
            type: DataTypes.STRING
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
            // allowNull: false, 
            // Por ahora vale null, ya que manejamos Auth0
        },
        biography:{
            type: DataTypes.STRING
        },
        user_rol_id:{
            type: DataTypes.STRING
        },
        user_colab: {
            type: DataTypes.BOOLEAN
        }
    })
}
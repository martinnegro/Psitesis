const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('notification', {
		id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
		},
		link: {
			type: DataTypes.STRING,
		},
		description: {
			type: DataTypes.STRING,
		},
		read: {
			type: DataTypes.BOOLEAN,
			default: false,
		},
		senderId: {
			type: DataTypes.UUID,
			field: 'sender_id',
			allowNull: true,
		},
		receiverId: {
			type: DataTypes.UUID,
			field: 'receiver_id',
			allowNull: true,
		},
	});
};

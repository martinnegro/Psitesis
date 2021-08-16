const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('topic', {
		topic_id: {
			type: DataTypes.UUID,
			allowNull: false,
			primaryKey: true,
		},
		topic_id: {
			type: DataTypes.STRING,
		},
	});
};

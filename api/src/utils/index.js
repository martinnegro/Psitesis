const { Notification, User } = require('./../db');

const organizeRoles = (roles) => {
	const organizedRoles = [];
	if (roles) {
		for (let i in roles) {
			organizedRoles.push(roles[i].name);
		}
	}
	return organizedRoles;
};


/**
 * Crea una notificaion en la base de datos y despues la envia por socket al destinatario si esta conectado
 * se usa dando 5 parametros req, description, link, receiverId, senderId
 * ejeplo de uso:
 * sendNotification(req, "Esta es una notifcaion", "/forum/post/2bbc2619-645e-4f93-bd11-38b42b529698", receiverId, senderId);
 * @req es la request de la ruta donde se usa
 * @description es el contenido que tendra la notificaion
 * @link es el link cuando se toca la notificacion ejemplo /forum/post/2bbc2619-645e-4f93-bd11-38b42b529698
 * no poner la url completa solo la path final
 * @receiverId el id del usuario que recibira la notificacion, es el user_id de User en la BD
 * @senderId el id del usuario que envia la notificacion, es el user_id de User en la BD
 */
const sendNotification =  async (req, description, link, receiverId, senderId) => {
	try {
		const notification = {
			id: uuidv4(),
			link: link,
			read: false,
			description: description,
			receiverId: receiverId,
			senderId: senderId,
		};
		await Notification.create(notification);
		const user = await User.findOne({
			where: { user_id: receiverId },
		});
		const notificationCreated = await Notification.findOne({
			where: { id: notification.id },
			include: [
				{
					model: User,
					as: 'receiver',
					attributes: ['user_id', 'user_img_profile', 'user_id_A0'],
				},
				{
					model: User,
					as: 'sender',
					attributes: ['user_id', 'user_img_profile', 'user_id_A0'],
				},
			],
		});
		req.io.to(user.user_id_A0).emit('NOTIFICATIONS', notificationCreated);
	} catch (error) {
		return error;
	}
};

module.exports = {
	sendNotification,
	organizeRoles,
};

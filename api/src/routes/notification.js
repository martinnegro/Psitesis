const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const { User, Notification } = require('../db');
const { authorizeAccessToken } = require('../auth/index');

router.get('/', authorizeAccessToken, async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: { user_id_A0: req.user.sub },
		});
		console.log(user.user_id);
		const notifications = await Notification.findAll({
			where: { receiver_id: user.user_id },
			order: [['updatedAt', 'DESC']],
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
		res.json({ message: 'successful', notifications: notifications });
	} catch (error) {
		next(error);
	}
});

router.get('/test', authorizeAccessToken, async (req, res, next) => {
	try {
		const message = {
			id: 'bc319c01-cc70-4e5f-a4db-ac204d64ad07',
			link: '/user/google-oauth2|110400245480152722998',
			description: 'descripcion',
			read: false,
			senderId: '61c91e70-8716-49bd-b9aa-fe560cddd2c2',
			receiverId: '61c91e70-8716-49bd-b9aa-fe560cddd2c2',
			createdAt: new Date(),
			updatedAt: '2021-08-23T16:08:44.040Z',
			receiver: {
				user_id: '61c91e70-8716-49bd-b9aa-fe560cddd2c2',
				user_img_profile:
					'https://lh3.googleusercontent.com/a-/AOh14Giw6MkDLbwfrB0Z_lLKUkx1XLdyVeVQMk65yVgv8A=s96-c',
			},
			sender: {
				user_id: '61c91e70-8716-49bd-b9aa-fe560cddd2c2',
				user_img_profile:
					'https://lh3.googleusercontent.com/a-/AOh14Giw6MkDLbwfrB0Z_lLKUkx1XLdyVeVQMk65yVgv8A=s96-c',
			},
		};
		req.io.to(req.user.sub).emit('NOTIFICATIONS', message);
		res.json({ message: 'successful' });
	} catch (error) {
		next(error);
	}
});

module.exports = router;

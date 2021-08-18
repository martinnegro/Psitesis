const { Router } = require('express');
const {
	management,
	authorizeAccessToken,
} = require('../auth/index');
const { User } = require("../db");
const { v4: uuidv4 } = require('uuid');
const { organizeRoles } = require('./../utils');
const router = Router();

router.get('/check_token', authorizeAccessToken, async (req, res, next) => {
	try {
		const user = await User.findOne({
			where: {
				user_id_A0: req.user.sub,
			},
		});
		if (!user) {
			const userAuth0 = await management.getUser({
				id: req.user.sub,
			});
			await User.create({
				user_id: uuidv4(),
				user_id_A0: req.user.sub,
				user_name: userAuth0.name,
				user_email: userAuth0.email,
				user_img_profile: userAuth0.picture,
			});
			res.json({
				message: 'verified token',
				user: { ...userAuth0, roles: [] },
			});
		} else {
			const roles = await management.getUserRoles({
				id: req.user.sub,
			});
			const organizedRoles = organizeRoles(roles);
			const userAuth0 = await management.getUser({
				id: req.user.sub,
			});
			res.json({
				message: 'verified token',
				user: { ...userAuth0, roles: organizedRoles },
			});
		}
	} catch (error) {
		next(error);
	}
});

router.get(
	'/send_verify_email',
	authorizeAccessToken,
	async (req, res, next) => {
		try {
			await management.sendEmailVerification({ user_id: req.user.sub });
			res.json({
				message: 'email verification sent!',
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;

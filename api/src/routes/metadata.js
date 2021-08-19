const { Router } = require('express');
const router = Router();
const {
	management,
	authorizeAccessToken,
	checkAdminPermission,
} = require('../auth/index');

router.get('/', authorizeAccessToken, async (req, res, next) => {
	try {
		const { id } = req.query;
		if (!id) {
			return res.json({ message: 'Bad request', metadata: null });
		}
		const user = await management.getUser({
			id: id,
		});
		if (!user) {
			return res.json({ message: 'Bad request', metadata: null });
		}
		if (user.user_metadata) {
			return res.json({
				message: 'successful',
				metadata: user.user_metadata,
			});
		}
		await management.updateUserMetadata({ id: id }, { links: [] });
		res.json({ message: 'not metadata', metadata: null });
	} catch (err) {
		next(err);
	}
});

router.post('/', authorizeAccessToken, async (req, res, next) => {
	const { user_id_A0, newLink } = req.body;
	try {
		if (!user_id_A0 || !newLink) {
			return res.json({ message: 'Bad request', metadata: null });
		}
		const user = await management.getUser({
			id: user_id_A0,
		});
		if (!user) {
			return res.json({ message: 'Bad request', metadata: null });
		}
		let auxMetadata = user.user_metadata;
		auxMetadata.links.push(newLink);
		const response = await management.updateUserMetadata(
			{ id: user_id_A0 },
			auxMetadata
		);
		res.json({ message: 'successful', metadata: response.user_metadata });
	} catch (err) {
		next(err);
	}
});

router.delete('/', authorizeAccessToken, async (req, res, next) => {
	const { user_id_A0, link } = req.query;
	try {
		if (!user_id_A0 || !link) {
			return res.json({ message: 'Bad request', metadata: null });
		}
		const user = await management.getUser({
			id: user_id_A0,
		});
		if (!user) {
			return res.json({ message: 'Bad request', metadata: null });
		}
		let auxMetadata = user.user_metadata;
		const indexLink = auxMetadata.links.indexOf(link);
		auxMetadata.links.splice(indexLink, 1);
		const response = await management.updateUserMetadata(
			{ id: user_id_A0 },
			auxMetadata
		);
		res.json({ message: 'successful', metadata: response.user_metadata });
	} catch (err) {
		next(err);
	}
});

module.exports = router;

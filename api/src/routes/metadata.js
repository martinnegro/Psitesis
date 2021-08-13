const { Router } = require('express');
const router = Router();
const {
	management,
	authorizeAccessToken,
	checkAdminPermission,
} = require('../auth/index');

router.get('/', authorizeAccessToken, async (req, res, next) => {
	const { id } = req.query;
	try {
		if (id) {
			const user = await management.getUser({
				id: id,
			});
			if (user && user.user_metadata) {
				return res.json({ metadata: user.user_metadata });
			}
		}
		res.json({ metadata: null });
	} catch (err) {
		next(err);
	}
});

router.post('/', authorizeAccessToken, async (req, res, next) => {
	const { user_id_A0, newLink } = req.body;
	try {
		const user = await management.getUser({
			id: user_id_A0,
		});
		if (user.user_metadata.links) {
			let auxMetadata = user.user_metadata;
			if (newLink) {
				auxMetadata.links.push(newLink);
				const userResponse = await management.updateUserMetadata(
					{ id: user_id_A0 },
					auxMetadata
				);
				return res.json({ metadata: userResponse.user_metadata });
			}
		} else {
			let auxMetadata = { links: [] };
			auxMetadata.links.push(newLink);
			const userResponse = await management.updateUserMetadata(
				{ id: user_id_A0 },
				auxMetadata
			);
			return res.json({ metadata: userResponse.user_metadata });
		}
		res.json({ metadata: null });
	} catch (err) {
		next(err);
	}
});

router.delete('/', authorizeAccessToken, async (req, res, next) => {
	const { user_id_A0, link } = req.body;
	try {
		if(!user_id_A0){
			return res.json({ metadata: null });
		}
		const user = await management.getUser({
			id: user_id_A0,
		});
		if (user && user.user_metadata.links) {

			let auxMetadata = user.user_metadata;
			if (link) {
				const i = auxMetadata.links.indexOf(link);
				auxMetadata.links.splice(i, 1);
				const userResponse = await management.updateUserMetadata(
					{ id: user_id_A0 },
					auxMetadata
				);
				return res.json({ metadata: userResponse.user_metadata });
			}
		} else {
			let auxMetadata = user.user_metadata;
			auxMetadata.links = [];
			const userResponse = await management.updateUserMetadata(
				{ id: user_id_A0 },
				auxMetadata
			);
			return res.json({ metadata: userResponse.user_metadata });
		}
		res.json({ metadata: null });
	} catch (err) {
		next(err);
	}
});

module.exports = router;

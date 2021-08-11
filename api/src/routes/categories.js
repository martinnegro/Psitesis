const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const { Category, SubCategory } = require('../db');
const { authorizeAccessToken, checkAdminPermission } = require('../auth/index');

router.get('/', async (req, res, next) => {
	try {
		const cats = await Category.findAll();
		const sub_cats = await SubCategory.findAll();
		res.json({ cats, sub_cats });
	} catch (err) {
		next(err);
	}
});

router.put(
	'/',
	authorizeAccessToken,
	checkAdminPermission,
	async (req, res, next) => {
		try {
			const { name, id } = req.body;
			if (name && id) {
				const targetCategory = await Category.findByPk(id);
				if (targetCategory) {
					targetCategory.cat_name = name;
					await targetCategory.save();
				}
			}
			const cats = await Category.findAll();
			const sub_cats = await SubCategory.findAll();
			res.json({ cats, sub_cats });
		} catch (err) {
			next(err);
		}
	}
);

router.delete(
	'/:id',
	authorizeAccessToken,
	checkAdminPermission,
	async (req, res, next) => {
		try {
			const { id } = req.params;
			if (id) {
				const targetCategory = await Category.findByPk(id);
				if (targetCategory) {
					await targetCategory.destroy();
				}
			}
			const cats = await Category.findAll();
			const sub_cats = await SubCategory.findAll();
			res.json({ cats, sub_cats });
		} catch (err) {
			next(err);
		}
	}
);

router.post(
	'/',
	authorizeAccessToken,
	checkAdminPermission,
	async (req, res, next) => {
		try {
			const { name } = req.body;
			if (name) {
				const id = uuidv4();
				await Category.create({
					cat_id: id,
					cat_name: name,
				});
			}
			const cats = await Category.findAll();
			const sub_cats = await SubCategory.findAll();
			res.json({ cats, sub_cats });
		} catch (err) {
			next(err);
		}
	}
);

module.exports = router;

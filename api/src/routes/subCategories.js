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
			const { name, id, description } = req.body;
			if (name && id) {
				console.log(id);
				const targetSubCategory = await SubCategory.findByPk(id);
				if (targetSubCategory) {
					targetSubCategory.sub_cat_name = name;
					if (description) targetSubCategory.sub_cat_description = description;
					await targetSubCategory.save();
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
				const targetCategory = await SubCategory.findByPk(id);
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
			const { id, name, description } = req.body;
			if (id && name) {
				const sub_cat_id = uuidv4();
				await SubCategory.create({
					sub_cat_id: sub_cat_id,
					sub_cat_name: name,
					sub_cat_description: description,
					cat_id: id,
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

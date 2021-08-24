const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const { Category, Subcategory, Article } = require('../db');
const { authorizeAccessToken, checkAdminPermission } = require('../auth/index');

router.get('/', async (req, res, next) => {
	try {
		const cats = await Category.findAll();
		const sub_cats = await Subcategory.findAll();
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
			const sub_cats = await Subcategory.findAll();
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
				const subCategories = await Subcategory.findAll({where: { cat_id: targetCategory.cat_id }});
				if (targetCategory) {
					if (subCategories.length > 0 ) subCategories.forEach(async sb => await sb.destroy());
					await targetCategory.destroy();
				}
			}		
			const cats = await Category.findAll();
			const sub_cats = await Subcategory.findAll();
			res.json({ cats, sub_cats });
		} catch (err) { next(err); }
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
			const sub_cats = await Subcategory.findAll();
			res.json({ cats, sub_cats });
		} catch (err) {
			next(err);
		}
	}
);

router.get('/categories', async (req, res, next) => {
    try{
        const article = await Category.findAll({
            include: [{ 
				model: Article,
				where: { art_available: true } 
			}],
        })
        res.json(article)
    }catch(err){
        console.error(err.message)
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        let categoria = await Category.findByPk(id, {
            include: [{ 
				model: Article,
				where: { art_available: true } 
			}],
        })
        return res.json(categoria)
    } catch (error) {
        next(error)
    }
});
module.exports = router;

const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const { Category, SubCategory } = require('../db'); 

router.get('/', async (req, res, next) => {
    try {
        const cats = await Category.findAll();
        const sub_cats = await SubCategory.findAll();
        res.json({cats, sub_cats})
    } catch (err) { next(err) }
});

module.exports = router;
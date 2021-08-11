const { Router } = require('express');
const router = Router();
const { v4: uuidv4 } = require('uuid');
const { Category, Subcategory, Article } = require('../db'); 

router.get('/', async (req, res, next) => {
    try {
        const cats = await Category.findAll();
        const sub_cats = await Subcategory.findAll();
        res.json({cats, sub_cats})
    } catch (err) { next(err) }
});

router.get('/categories', async (req, res, next) => {
    try{
        const article = await Category.findAll({
            include: {model: Article},
        })
        res.json(article)
    }catch(err){
        console.error(err.message)
    }
});

//Agregue ruta para buscar una categoria especifica
router.get('/:id', async (req, res, next) => {
    try {
        const {id} = req.params;
        let categoria = await Category.findByPk(id, {
            include: {model: Article}
        })
        return res.json(categoria)
    } catch (error) {
        next(error)
    }
});
module.exports = router;
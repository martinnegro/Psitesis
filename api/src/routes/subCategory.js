const { Router } = require("express");
const router = Router();
const { Article, Subcategory,  } = require("../db");

router.get("/", async (req, res) => {
    try{
        const article = await Subcategory.findAll({
            include: {model: Article},
        })
        if(article.length === 0){
            res.json({message: "Article do not found"})
        }else{
            let articles = []
            for(let x in article){
                 articles = article[x].articles
            }
            res.json(articles)
        }
    }catch(err){
        console.error(err.message)
    }
})

router.get("/category/:id", async (req, res) => {
    try{
        const {id} = req.params
        const subcategoria = await Subcategory.findAll({
            where: { cat_id: id},            
            include: { model: Article },
        })
        res.json(subcategoria)
    }catch(err){
        console.error(err.message)
    }
})

router.get("/:id", async (req, res) => {
    try{
        const { id } = req.params
            const article = await Subcategory.findByPk(id, {
                include: {model: Article},
            })
        res.json(article)
    }catch(err){
        console.error(err.message)
    }
})

module.exports = router; 
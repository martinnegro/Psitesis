const { Router } = require("express");
const router = Router();
const { Op } = require('sequelize');

const { 
    Article,
    Tag
} = require("../db.js")

router.get("/", async (req, res) => {
    try{
        const {tag} = req.query
        if(tag){
            const article = await Tag.findAll({
                include: {model: Article},
                where: {tag_name: {[Op.iLike]: `%${tag}`}}
            })
            if(article.length === 0){
                res.json({message: "Article do not found"})
            }else{
                res.json(article)
            }
        }
    }catch(err){
        console.error(err.message)
    }
})
module.exports = router;
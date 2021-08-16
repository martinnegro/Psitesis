const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { Forumpost, Comment } = require('../db');

router.get('/:post_id', async (req, res, next) => {
    const { post_id } = req.params;
    
    try {
    const result = await Forumpost.findByPk(post_id,{
        include: [{ model: Comment }]
    });
    res.json(result);
    } catch(err) { next(err) } 
    
});



module.exports = router;

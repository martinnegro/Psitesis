const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const sequelize = require('sequelize');
const { Forumpost, Comment, User, Subtopic, Topic } = require('../db');

router.get('/', async (req, res, next) => {
    const result = await Forumpost.findAll();
    res.json(result)
});

router.get('/:post_id', async (req, res, next) => {
    const { post_id } = req.params;
    
    try {
    const result = await Forumpost.findByPk(post_id,{
        include: [{ 
            model: Comment, 
            include: [{model: User}] 
        },{
            model: User
        },{
            model: Subtopic,
            include: [{ model: Topic }]
        }],
    });
    res.json(result);
    } catch(err) { next(err) } 
    
});



module.exports = router;

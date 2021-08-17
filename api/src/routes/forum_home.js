
const { Router } = require("express");
const router = Router();
const sequelize = require('sequelize')
const { v4: uuidv4 } = require("uuid");
const { Topic, Subtopic, Forumpost, User, Comment } = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const topicsAndSub = await Topic.findAll({
          include: {
            model: Subtopic,
            include: [{ model: Forumpost }]
          }
        });
        
        const last20Post = await Forumpost.findAll({
          include: [
            {model: Subtopic},
            {model: User},
            {model: Comment,attribute: [sequelize.fn('count', sequelize.col('user_id'))]}
          ],
          limit: 20,
          order: [['createdAt','DESC']]
        })
    
        res.json({topicsAndSub,last20Post});
    } catch(err) { next(err) }
  });
  

module.exports = router;
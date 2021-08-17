
const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { Topic, Subtopic, Forumpost, User } = require("../db");

router.get('/', async (req, res, next) => {
    try {
        const topicsAndSub = await Topic.findAll({
          include: {
            model: Subtopic,
            include: [{ model: Forumpost }]
          }
        });
        
        const last20Post = await Forumpost.findAll({
          include: [{model: Subtopic},{model: User}],
          limit: 20,
          order: [['createdAt','DESC']]
        })
    
        res.json({topicsAndSub,last20Post});
    } catch(err) { next(err) }
  });
  

module.exports = router;
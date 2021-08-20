const { Router } = require("express");

const router = Router();
const { Subtopic, Forumpost, User, Comment, Topic } = require("../db");

router.get('/', async (req, res)=>{
  let subtopics = await Topic.findAll({
    include: {model: Subtopic}
  });
  res.json(subtopics);
})

router.get("/:id", async (req, res) => {
  let {id} = req.params
    let query = await Subtopic.findAll({
      where: { sub_topic_id: id },
      include:[
        { 
          model: Forumpost,
          include: [
            { model: Comment },
            { model: User }, 
          ] 
        },{ 
          model: Topic,
          attributes: ['topic_name']
        }
      ]
    })
    res.json(query[0]);
});

module.exports = router;

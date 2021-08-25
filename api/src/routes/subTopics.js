const { Router } = require("express");
const { v4: uuidv4 } = require("uuid");
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
      ],
      order: [['createdAt','DESC']]
    })
    res.json(query[0]);
});

router.post('/', async (req, res,next) => {
  try{
    const {sub_topic_name, sub_topic_description, topic_id} = req.body;
    let newSubtopic = await Subtopic.create({
      sub_topic_id : uuidv4(),
      sub_topic_name,
      sub_topic_description
    })
    await newSubtopic.setTopic(topic_id)
    return res.json(newSubtopic)

  }catch(err){
    next(err);
  }
})

router.put('/edit/:sub_topic_id', async (req, res, next) => {
  try{
    const {sub_topic_id} = req.params;
    const {name, description} = req.body;
    const subtopic = await Subtopic.findByPk(sub_topic_id)
    console.log(subtopic)
    subtopic.sub_topic_name = name;
    subtopic.sub_topic_description = description;
    await subtopic.save()
    return res.json(subtopic)
  }catch(err){
    next(err);
  }
})

router.delete('/delete/:sub_topic_id', async (req, res, next)=>{
  const {sub_topic_id} = req.params
  try{
    const subtopic = await Subtopic.findByPk(sub_topic_id);
    await subtopic.destroy();
    res.json({message: "Deleted"})
  }catch(err){
    next(err);
  }
})


module.exports = router;

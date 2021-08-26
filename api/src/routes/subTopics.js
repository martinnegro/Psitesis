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
    const {name, description, id} = req.body;
    console.log(req.body)
    let newSubtopic = await Subtopic.create({
      sub_topic_id : uuidv4(),
      sub_topic_name: name,
      sub_topic_description: description,
    })
    await newSubtopic.setTopic(id)

    let allTopics = await Topic.findAll({
      include: {model: Subtopic}
    })
    return res.json(allTopics)
    

  }catch(err){
    next(err);
  }
})

router.put('/edit', async (req, res, next) => {
  try{
  
    const {id, name, description} = req.body;
    const subtopic = await Subtopic.findByPk(id)
    console.log(subtopic)
    subtopic.sub_topic_name = name;
    subtopic.sub_topic_description = description;
    await subtopic.save()

    let allTopics = await Topic.findAll({
      include: {model: Subtopic}
    })
    return res.json(allTopics)
  }catch(err){
    next(err);
  }
})

router.delete('/delete/:sub_topic_id', async (req, res, next)=>{
  const {sub_topic_id} = req.params
  try{
    const subtopic = await Subtopic.findByPk(sub_topic_id);
    await subtopic.destroy();
    let allTopics = await Topic.findAll({
      include: {model: Subtopic}
    })
    return res.json(allTopics)
  }catch(err){
    next(err)
  }
})


module.exports = router;

const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { Topic, Subtopic, Forumpost } = require("../db");

router.get("/", (req, res, next) => {
  return Topic.findAll()
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

router.post("/", async (req, res, next) => {
  try{
    const {name} = req.body;
    let newTopic = await Topic.create({
      topic_id: uuidv4(),
      topic_name: name
    })

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

    const {id, name} = req.body;
    const topic = await Topic.findByPk(id)
    topic.topic_name = name;
    await topic.save()

    let allTopics = await Topic.findAll({
      include: {model: Subtopic}
    })
    return res.json(allTopics)
  }catch(err){
    next(err);
  }
})

router.delete('/delete/:id', async (req, res, next)=>{
  const {id} = req.params
  try{
    const topic = await Topic.findByPk(id);
    await topic.destroy();
    let allTopics = await Topic.findAll({
      include: {model: Subtopic}
    })
    console.log("eliminado")
    return res.json(allTopics)
    
  }catch(err){
    next(err);
  }
})

module.exports = router;

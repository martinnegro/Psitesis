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
    const {topic_name} = req.body;
    let newTopic = await Topic.create({
      topic_id: uuidv4(),
      topic_name
    })

   return res.json(newTopic)
  }catch(err){
    next(err);
  }
})

router.put('/edit/:topic_id', async (req, res, next) => {
  try{
    const {topic_id} = req.params;
    const {name} = req.body;
    const topic = await Topic.findByPk(topic_id)
    topic.topic_name = name;
    await topic.save()
    return res.json(topic)
  }catch(err){
    next(err);
  }
})

router.delete('/delete/:topic_id', async (req, res, next)=>{
  const {topic_id} = req.params
  try{
    const topic = await Topic.findByPk(topic_id);
    await topic.destroy();
    res.json({message: "Deleted"})
  }catch(err){
    next(err);
  }
})

module.exports = router;

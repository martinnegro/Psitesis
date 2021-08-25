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

module.exports = router;

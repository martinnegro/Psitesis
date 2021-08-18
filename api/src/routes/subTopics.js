const { Router } = require("express");
const router = Router();
const { Subtopic, Forumpost, User } = require("../db");

router.get("/:id", async (req, res) => {
  let {id} = req.params
    let query = await Forumpost.findAll({
      where: { sub_topic_id:id},
      include:[{model: User}, {model: Subtopic}]
    })
    res.json(query);
});

module.exports = router;

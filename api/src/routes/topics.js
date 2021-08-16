const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { Topic, Subtopic } = require("../db");

router.get("/", (req, res, next) => {
  return Topic.findAll()
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

router.get("/:subtopics", (req, res, next) => {
  const { subtopics } = req.params;
  if (subtopics) {
    return Topic.findAll({
      include: [{ model: Subtopic }],
    })
      .then((response) => res.json(response))
      .catch((err) => next(err));
  }
});

module.exports = router;

const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { Topic, Subtopic, Forumpost } = require("../db");

router.get("/", (req, res, next) => {
  return Topic.findAll()
    .then((response) => res.json(response))
    .catch((err) => next(err));
});

module.exports = router;

const { Router } = require("express");
const router = Router();
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { Forumpost, Comment } = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const comments = await Comment.findAll();
    return res.json(comments);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { comment_contents, post_id, user_id, response_to_comment_id } =
      req.body;
    const id = uuidv4();
    const newComment = await Comment.create({
      comment_id: id,
      comment_contents,
      post_id,
      user_id,
      response_to_comment_id,
    });
    return res.status(201).send(newComment);
  } catch (err) {
    next(err);
  }
});

router.put("/edit/:comment_id", async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const { comment_contents } = req.body;
    const comment = await Comment.findByPk(comment_id);
    comment.comment_contents = comment_contents;
    await comment.save();
  } catch (err) {
    next(err);
  }
});

module.exports = router;

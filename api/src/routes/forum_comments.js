const { Router } = require("express");
const router = Router();
const sequelize = require("sequelize");
const { v4: uuidv4 } = require("uuid");
const { Forumpost, Comment, User } = require("../db");
const { sendNotification } = require("./../utils");
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
      // RESPOSNE_TO_COMMENT_ID ES EL ID DEL COMENTARIO QUE USER_ID RESPONDE
      response_to_comment_id,
      deleted: false,
    });
    const officialPoster = await Forumpost.findOne({
      where: {
        post_id: post_id,
      },
      include: [{ model: User, attributes: ["user_id"] }],
    });

    const replyingTo = await Comment.findOne({
      where: {
        comment_id: response_to_comment_id,
      },
      include: [{ model: User, attributes: ["user_id"] }],
    });

    if (response_to_comment_id) {
      sendNotification(
        req,
        "Han contestado un comentario tuyo",
        `/forum/post/${post_id}#${id}`,
        replyingTo.user_id,
        user_id
      );
    }

    if (user_id !== officialPoster.user_id) {
      sendNotification(
        req,
        "Han comentado tu post",
        `/forum/post/${post_id}`,
        officialPoster.user_id,
        user_id
      );
    }

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
    return res.json(comment);
  } catch (err) {
    next(err);
  }
});

router.put("/delete/:comment_id", async (req, res, next) => {
  const { comment_id } = req.params;
  try {
    const comment = await Comment.findByPk(comment_id);
    comment.comment_contents = "Mensaje eliminado";
    comment.deleted = true;
    await comment.save();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

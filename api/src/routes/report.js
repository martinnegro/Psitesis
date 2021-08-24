const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { authorizeAccessToken, checkAdminPermission } = require("../auth/index");

const { Report, Comment, ForumPost } = require("../db");

router.post("/", async (req, res, next) => {
  try {
    const { rep_reason, comment_id, post_id } = await req.body;
    let newReport = await Report.create({
      rep_id: uuidv4(),
      rep_reason,
      rep_resolved: false,
    });

    if (comment_id !== null) {
      await newReport.setComment(comment_id);
    }

    if (post_id !== null) {
      await newReport.setForumpost(post_id);
    }
    return res.json(newReport);
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const { prop, value } = req.query;
    const commentsReports = await Comment.findAll({
      attributes: [
        "comment_id",
        "comment_contents",
        "deleted",
        "post_id",
        "user_id",
      ],
      include: {
        model: Report,
        where: {
          [prop]: value,
        },
      },
    });
    return res.json(commentsReports);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

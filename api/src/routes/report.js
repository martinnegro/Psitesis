const { Router } = require("express");
const router = Router();
const { v4: uuidv4 } = require("uuid");
const { authorizeAccessToken, checkAdminPermission } = require("../auth/index");

const { Report, User, Comment, Forumpost } = require("../db");

router.post("/", authorizeAccessToken, async (req, res, next) => {
  try {
    const { rep_reason, comment_id, post_id } = await req.body;
    let newReport = await Report.create({
      rep_id: uuidv4(),
      rep_reason,
      rep_resolved: false,
    });

    const aux_user = await User.findOne({
      where: { user_id_A0: req.user.sub },
    });

    await newReport.setUser(aux_user.user_id);

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

    const postReports = await Forumpost.findAll({
      include: {
        model: Report,
        where: {
          [prop]: value,
        },
        include: [{ model: User }],
      },
    });

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
        include: [{ model: User }],
      },
    });
    return res.json({
      posts: postReports,
      comments: commentsReports,
    });
  } catch (err) {
    next(err);
  }
});

router.put("/resolve/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await Report.findByPk(id);
    report.rep_resolved = true;
    await report.save();
    return res.json(report);
  } catch (err) {
    next(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const report = await Report.findByPk(id);
    await report.destroy();
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
});
module.exports = router;
